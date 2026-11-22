
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import {
  getRefreshToken,
  removeAuthTokens,
} from "@/storage/authStorage";

import { logoutFromServer } from "@/services/authApi";

/**
 * Lenary 로그아웃 Custom Hook
 *
 * 1. Refresh Token 조회
 * 2. FastAPI 서버에서 로그인 세션 폐기
 * 3. SecureStore의 Access / Refresh Token 삭제
 * 4. 로그인 화면 이동
 */
export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    // 중복 로그아웃 요청 방지
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // 1. SecureStore에서 Refresh Token 조회
      const refreshToken = await getRefreshToken();

      // 2. FastAPI 서버에 로그아웃 요청
      if (refreshToken) {
        try {
          await logoutFromServer(refreshToken);

          // console.log("[Auth] 서버 세션 폐기 완료");
        } catch (serverError) {
          // 서버 요청 실패 시에도 로컬 로그아웃 진행
          // 단, 서버 세션이 폐기되었다고 보장할 수 없음
          console.warn(
            "[Auth] 서버 로그아웃 요청 실패:",
            serverError
          );
        }
      }

      // 3. SecureStore에 저장된 모든 인증 토큰 삭제
      await removeAuthTokens();

      // console.log("[Auth] 로컬 인증 토큰 삭제 완료");

      // 4. 로그인 화면으로 이동
      router.replace("/login");

    } catch (error) {
      console.error("[Auth] 로그아웃 실패:", error);

      Alert.alert(
        "로그아웃 실패",
        "로그아웃 중 문제가 발생했습니다. 다시 시도해주세요."
      );

    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    handleLogout,
    isLoggingOut,
  };
}
