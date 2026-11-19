import { useState } from "react";
import { Alert } from "react-native";

import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";

import { GOOGLE_CONFIG } from "@/constants/config";


let isConfigured = false;

// Google 로그인 초기 설정
const configureGoogleSignin = () => {
  const { iosClientId, webClientId } = GOOGLE_CONFIG;

  if (!iosClientId || !webClientId) {
    throw new Error("Google Client ID가 설정되지 않았습니다.");
  }

  // 앱 실행 중 한 번만 설정
  if (!isConfigured) {
    GoogleSignin.configure({
      iosClientId,
      webClientId,
    });

    isConfigured = true;
  }
};


// Google 로그인 커스텀 Hook
export function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. Google 로그인 설정
      configureGoogleSignin();

      // 2. Google 계정 선택 및 로그인
      const response = await GoogleSignin.signIn();

      // 3. 로그인 취소 처리
      if (!isSuccessResponse(response)) {
        return;
      }

      // 4. Google ID Token 추출
      const idToken = response.data.idToken;

      if (!idToken) {
        throw new Error("Google ID Token을 받지 못했습니다.");
      }

      // 5. 토큰 수신 성공 확인
      console.log("Google ID Token 수신 성공");

      Alert.alert(
        "Google 인증 성공",
        "Google ID Token을 정상적으로 받았습니다."
      );

      // 다음 단계:
      // idToken을 FastAPI /auth/google로 전달

    } catch (error) {
      // 사용자가 로그인 창을 닫은 경우
      if (
        isErrorWithCode(error) &&
        error.code === statusCodes.SIGN_IN_CANCELLED
      ) {
        return;
      }

      console.error("Google 로그인 오류:", error);

      Alert.alert(
        "Google 로그인 실패",
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다."
      );

    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    isLoading,
  };
}