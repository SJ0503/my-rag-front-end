
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { initializeKakaoSDK } from "@react-native-kakao/core";

import { login } from "@react-native-kakao/user";

import { loginWithKakao } from "@/services/authApi";

import { saveAuthTokens } from "@/storage/authStorage";


const KAKAO_NATIVE_APP_KEY =
    process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

// SDK 초기화 중복 방지
let initPromise: Promise<void> | null = null;

async function ensureKakaoInitialized() {
    if (!KAKAO_NATIVE_APP_KEY) {
        throw new Error(
            "Kakao Native App Key가 설정되지 않았습니다."
        );
    }

    if (!initPromise) {
        initPromise = initializeKakaoSDK(
            KAKAO_NATIVE_APP_KEY
        ).catch((error) => {
            initPromise = null;
            throw error;
        });
    }

    await initPromise;
}


export function useKakaoLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const handleKakaoLogin = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            // console.log("[Kakao-1] 로그인 버튼 클릭");
            // 1. Kakao SDK 초기화
            await ensureKakaoInitialized();

            // console.log("[Kakao-2] SDK 초기화 성공");

            // console.log("[Kakao-3] 카카오 로그인 시작");
            // 2. Kakao 로그인
            const kakaoToken = await login({
                useKakaoAccountLogin: true,
            });
            // console.log("[Kakao-4] 카카오 로그인 응답 성공");

            if (!kakaoToken.accessToken) {
                throw new Error(
                    "Kakao Access Token이 없습니다."
                );
            }
            // console.log("[Kakao-5] FastAPI 로그인 요청");
            // 3. FastAPI에서 Kakao 토큰 검증
            const result = await loginWithKakao(
                kakaoToken.accessToken
            );
            // console.log("[Kakao-6] FastAPI 로그인 성공");
            // 4. Lenary JWT + Refresh Token 저장
            await saveAuthTokens(result);

            // console.log("[Kakao] Lenary 로그인 성공");

            // 5. 문서 화면 이동
            router.replace("/documents");

        } catch (error) {
            console.error("[Kakao] 로그인 오류:", error);

            Alert.alert(
                "Kakao 로그인 실패",
                "로그인 과정에서 오류가 발생했습니다."
            );

        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleKakaoLogin,
        isLoading,
    };
}
