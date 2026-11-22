
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { initializeKakaoSDK } from "@react-native-kakao/core";
import { login } from "@react-native-kakao/user";

import { loginWithKakao } from "@/services/authApi";
import { saveAuthTokens } from "@/storage/authStorage";

// Kakao Native App Key
const KAKAO_NATIVE_APP_KEY =
  process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY;

// SDK 중복 초기화 방지
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

/**
 * 사용자가 Kakao 로그인을 취소했는지 확인
 */
function isKakaoLoginCancelled(error: unknown): boolean {
  if (
    typeof error !== "object" ||
    error === null ||
    !("code" in error)
  ) {
    return false;
  }

  return (
    error.code === "Cancelled" ||
    error.code === "Canceled"
  );
}

export function useKakaoLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. Kakao SDK 초기화
      await ensureKakaoInitialized();

      // 2. Kakao 로그인
      const kakaoToken = await login({
        useKakaoAccountLogin: true,
      });

      if (!kakaoToken.accessToken) {
        throw new Error(
          "Kakao Access Token이 없습니다."
        );
      }

      // 3. FastAPI에서 Kakao 토큰 검증
      const result = await loginWithKakao(
        kakaoToken.accessToken
      );

      // 4. Lenary JWT + Refresh Token 저장
      await saveAuthTokens(result);

      // 5. 문서 화면 이동
      router.replace("/documents");

    } catch (error) {
      // 사용자가 '아니오'를 누른 경우
      // 오류 메시지 없이 로그인 화면 유지
      if (isKakaoLoginCancelled(error)) {
        return;
      }

      // 실제 로그인 오류만 표시
      console.error("[Kakao] 로그인 오류:", error);

      Alert.alert(
        "Kakao 로그인 실패",
        "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
      );

    } finally {
      // 로그인 성공, 취소, 오류 모두 로딩 해제
      setIsLoading(false);
    }
  };

  return {
    handleKakaoLogin,
    isLoading,
  };
}
