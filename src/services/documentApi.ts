
import * as DocumentPicker from "expo-document-picker";
import { File, UploadType } from "expo-file-system";

import { ApiHttpError } from "@/services/appClient";
import { refreshAccessToken } from "@/services/authSession";
import { getAccessToken } from "@/storage/authStorage";

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_BASE_URL
        ?.trim()
        .replace(/\/+$/, "");

const MAX_FILE_SIZE = 50 * 1024 * 1024;

// FastAPI 업로드 응답
export type UploadDocumentResponse = {
    upload_id: string;
    filename: string;
    size_bytes: number;
    status: string;
};

/**
 * 1. 사용자 문서 선택
 */
export async function pickDocument() {
    const result = await DocumentPicker.getDocumentAsync({
        type: [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ],
        copyToCacheDirectory: true,
        multiple: false,
    });

    // 문서 선택 취소
    if (result.canceled || !result.assets.length) {
        return null;
    }

    const file = result.assets[0];

    // 파일 크기 검사
    if (file.size !== undefined && file.size > MAX_FILE_SIZE) {
        throw new Error(
            "50MB 이하의 문서만 업로드할 수 있습니다."
        );
    }

    return file;
}

/**
 * 2. FastAPI에 문서 업로드
 */

export async function uploadDocument(
    file: DocumentPicker.DocumentPickerAsset
): Promise<UploadDocumentResponse> {
    if (!API_BASE_URL) {
        throw new Error("FastAPI 서버 주소가 설정되지 않았습니다.");
    }

    // 실제 로컬 파일 확인
    const localFile = new File(file.uri);

    if (!localFile.exists) {
        throw new Error("선택한 파일을 찾을 수 없습니다.");
    }

    if (localFile.size > MAX_FILE_SIZE) {
        throw new Error("50MB 이하의 파일만 업로드할 수 있습니다.");
    }

    console.log("[Document] 파일명:", file.name);
    console.log("[Document] 파일 크기:", localFile.size);

    // 네이티브 파일 업로드
    const sendFile = (accessToken: string) => {
        return localFile.upload(
            `${API_BASE_URL}/documents/upload`,
            {
                httpMethod: "POST",
                uploadType: UploadType.MULTIPART,
                fieldName: "file",
                mimeType: file.mimeType ?? "application/octet-stream",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                sessionType: "foreground",
            }
        );
    };

    // Access Token 조회
    let token = await getAccessToken();

    if (!token) {
        token = await refreshAccessToken();
    }

    console.log("[Document] 업로드 요청 시작");

    let response = await sendFile(token);

    console.log("[Document] 응답 상태:", response.status);

    // JWT 만료 시 재발급
    if (response.status === 401) {
        const latestToken = await getAccessToken();

        token =
            latestToken && latestToken !== token
                ? latestToken
                : await refreshAccessToken();

        response = await sendFile(token);
    }

    let result: Record<string, unknown> = {};

    try {
        result = JSON.parse(response.body);
    } catch {
        // JSON이 아닌 응답 처리
    }

    if (response.status < 200 || response.status >= 300) {
        throw new ApiHttpError(
            response.status,
            typeof result.detail === "string"
                ? result.detail
                : `문서 업로드 실패 (${response.status})`
        );
    }

    console.log("[Document] 업로드 성공");

    return result as UploadDocumentResponse;
}
