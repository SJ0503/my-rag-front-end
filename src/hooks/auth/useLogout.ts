
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { removeAccessToken } from "@/storage/authStorage";

/**
 * 로그아웃 관련 로직을 관리하는 Custom Hook
 */
export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // 1. SecureStore에서 JWT 삭제
      await removeAccessToken();

      console.log("[Auth] 로그아웃 성공");

      // 2. 로그인 화면으로 이동
      router.replace("/login");

    } catch (error) {
      console.error("[Auth] 로그아웃 오류:", error);

      Alert.alert(
        "로그아웃 실패",
        "다시 시도해주세요."
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
