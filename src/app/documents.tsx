
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  getMyDocuments,
  pickDocument,
  updateDocumentTitle,
  uploadDocument,
  type MyDocument,
} from "@/services/documentApi";

import { styles } from "@/styles/documents.styles";

// 파일 크기 변환
function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsScreen() {
  // 문서 목록
  const [documents, setDocuments] = useState<MyDocument[]>([]);

  // 문서 조회 로딩
  const [isLoadingDocuments, setIsLoadingDocuments] =
    useState(true);

  // 문서 업로드 로딩
  const [isUploading, setIsUploading] = useState(false);

  // 제목 변경 중인 문서 ID
  const [editingDocumentId, setEditingDocumentId] =
    useState<number | null>(null);

  // 변경할 문서 제목
  const [editingTitle, setEditingTitle] = useState("");

  // 제목 저장 로딩
  const [isSavingTitle, setIsSavingTitle] = useState(false);

  /**
   * 1. 사용자 문서 목록 조회
   */
  const loadDocuments = useCallback(async () => {
    try {
      const rows = await getMyDocuments();

      setDocuments(rows);
    } catch (error) {
      console.error(
        "[Document] 목록 조회 오류:",
        error
      );

      Alert.alert(
        "목록 조회 실패",
        "문서 목록을 불러오지 못했습니다."
      );
    } finally {
      setIsLoadingDocuments(false);
    }
  }, []);

  /**
   * 2. 문서 화면 진입 시 최신 목록 조회
   */
  useFocusEffect(
    useCallback(() => {
      void loadDocuments();
    }, [loadDocuments])
  );

  /**
   * 3. 문서 선택 및 업로드
   */
  const handleUpload = async () => {
    if (isUploading) return;

    setIsUploading(true);

    try {
      // 아이폰 파일 앱에서 문서 선택
      const file = await pickDocument();

      // 파일 선택 취소
      if (!file) return;

      // FastAPI에 문서 전송
      const result = await uploadDocument(file);

      console.log(
        "[Document] 업로드 완료:",
        result.filename
      );

      // 업로드 이후 MySQL 목록 재조회
      await loadDocuments();

      Alert.alert(
        "업로드 완료",
        `${file.name} 문서가 업로드되었습니다.`
      );
    } catch (error) {
      console.error(
        "[Document] 업로드 오류:",
        error
      );

      Alert.alert(
        "업로드 실패",
        error instanceof Error
          ? error.message
          : "문서를 업로드할 수 없습니다."
      );
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * 4. 문서 상세 화면 이동
   */
  const handleSelectDocument = (id: number) => {
    router.push(`/documents/${id}`);
  };

  /**
   * 5. 문서 제목 변경 모달 열기
   */
  const openTitleEditor = (
    documentId: number,
    currentTitle: string
  ) => {
    setEditingDocumentId(documentId);
    setEditingTitle(currentTitle);
  };

  /**
   * 6. 제목 변경 모달 닫기
   */
  const closeTitleEditor = () => {
    if (isSavingTitle) return;

    setEditingDocumentId(null);
    setEditingTitle("");
  };

  /**
   * 7. 문서 제목 변경
   */
  const handleSaveTitle = async () => {
    if (
      editingDocumentId === null ||
      isSavingTitle
    ) {
      return;
    }

    const newTitle = editingTitle.trim();

    // 빈 제목 방지
    if (!newTitle) {
      Alert.alert(
        "안내",
        "문서 제목을 입력해주세요."
      );
      return;
    }

    setIsSavingTitle(true);

    try {
      // FastAPI PATCH 요청
      await updateDocumentTitle(
        editingDocumentId,
        newTitle
      );

      // 변경된 제목을 화면에 즉시 반영
      setDocuments((previousDocuments) =>
        previousDocuments.map((document) =>
          document.document_id === editingDocumentId
            ? {
                ...document,
                title: newTitle,
              }
            : document
        )
      );

      // 모달 닫기
      setEditingDocumentId(null);
      setEditingTitle("");

      // MySQL에서 최신 목록 다시 조회
      await loadDocuments();

    } catch (error) {
      console.error(
        "[Document] 제목 변경 오류:",
        error
      );

      Alert.alert(
        "제목 변경 실패",
        error instanceof Error
          ? error.message
          : "다시 시도해주세요."
      );
    } finally {
      setIsSavingTitle(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      {/* 문서 화면 */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          내 문서
        </Text>

        <Text style={styles.subtitle}>
          학습할 문서를 업로드해보세요.
        </Text>

        {/* 문서 업로드 영역 */}
        <Pressable
          style={styles.uploadArea}
          onPress={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#17263F" />
          ) : (
            <Text style={styles.uploadIcon}>
              ⇧
            </Text>
          )}

          <Text style={styles.uploadTitle}>
            {isUploading
              ? "문서 업로드 중..."
              : "여기를 눌러 문서를 선택하세요"}
          </Text>

          <Text style={styles.uploadDescription}>
            PDF, DOCX, PPTX 파일 등을 지원해요. (최대 50MB)
          </Text>
        </Pressable>

        {/* 최근 업로드 */}
        <Text style={styles.sectionTitle}>
          최근 업로드
        </Text>

        {isLoadingDocuments ? (
          <ActivityIndicator color="#17263F" />

        ) : documents.length === 0 ? (
          <Text style={styles.subtitle}>
            아직 업로드한 문서가 없습니다.
          </Text>

        ) : (
          documents.map((document) => (
            <Pressable
              key={document.document_id}
              style={styles.documentCard}
              onPress={() =>
                handleSelectDocument(
                  document.document_id
                )
              }
            >
              {/* 파일 아이콘 */}
              <View style={styles.fileIconBox}>
                <Text style={styles.fileIcon}>
                  ▤
                </Text>

                <Text style={styles.fileType}>
                  {document.file_type.toUpperCase()}
                </Text>
              </View>

              {/* 문서 정보 */}
              <View style={styles.documentInformation}>
                <Text
                  style={styles.documentName}
                  numberOfLines={1}
                >
                  {document.title}
                </Text>

                <Text style={styles.documentDescription}>
                  {formatFileSize(document.file_size)}
                  {" · "}
                  {document.created_at.slice(0, 10)}
                </Text>
              </View>

              {/* 제목 변경 버튼 */}
              <Pressable
                onPress={(event) => {
                  // 문서 카드 클릭 이벤트 방지
                  event.stopPropagation();

                  openTitleEditor(
                    document.document_id,
                    document.title
                  );
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                }}
                accessibilityRole="button"
                accessibilityLabel="문서 제목 변경"
              >
                <Text style={styles.more}>
                  ⋮
                </Text>
              </Pressable>
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* 제목 변경 모달 */}
      <Modal
        visible={editingDocumentId !== null}
        transparent
        animationType="fade"
        onRequestClose={closeTitleEditor}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#17263F",
              }}
            >
              문서 제목 변경
            </Text>

            <TextInput
              value={editingTitle}
              onChangeText={setEditingTitle}
              maxLength={255}
              autoFocus
              placeholder="문서 제목"
              selectTextOnFocus
              style={{
                marginTop: 18,
                borderWidth: 1,
                borderColor: "#E1E5E0",
                borderRadius: 10,
                padding: 14,
                color: "#17263F",
                fontSize: 15,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 20,
                gap: 24,
              }}
            >
              {/* 취소 */}
              <Pressable
                onPress={closeTitleEditor}
                disabled={isSavingTitle}
              >
                <Text
                  style={{
                    color: "#718096",
                    fontSize: 15,
                  }}
                >
                  취소
                </Text>
              </Pressable>

              {/* 저장 */}
              <Pressable
                onPress={handleSaveTitle}
                disabled={
                  isSavingTitle ||
                  !editingTitle.trim()
                }
              >
                {isSavingTitle ? (
                  <ActivityIndicator
                    color="#17263F"
                  />
                ) : (
                  <Text
                    style={{
                      color: "#17263F",
                      fontSize: 15,
                      fontWeight: "700",
                    }}
                  >
                    저장
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNavigation}>
        {/* 현재 화면: 내 문서 */}
        <View style={styles.navigationItem}>
          <Text style={styles.activeNavigationIcon}>
            ▣
          </Text>

          <Text style={styles.activeNavigationText}>
            내 문서
          </Text>
        </View>

        {/* 마이페이지 이동 */}
        <Pressable
          style={styles.navigationItem}
          onPress={() => router.replace("/mypage")}
          accessibilityRole="button"
          accessibilityLabel="마이페이지"
        >
          <Text style={styles.navigationIcon}>
            ♙
          </Text>

          <Text style={styles.navigationText}>
            마이페이지
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
