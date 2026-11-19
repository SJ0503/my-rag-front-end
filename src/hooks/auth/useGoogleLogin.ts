
import { useState } from "react";
import { Alert } from "react-native";

import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";

import { GOOGLE_CONFIG } from "@/constants/config";
import { loginWithGoogle } from "@/services/authApi";


// Google 로그인 설정 여부
let isConfigured = false;


// Google 로그인 초기 설정
const configureGoogleSignin = () => {
  const { iosClientId, webClientId } = GOOGLE_CONFIG;

  if (!iosClientId || !webClientId) {
    throw new Error("Google Client ID가 설정되지 않았습니다.");
  }

  // 중복 설정 방지
  if (!isConfigured) {
    GoogleSignin.configure({
      iosClientId,
      webClientId,
    });

    isConfigured = true;
  }
};


// Google 로그인 Custom Hook
export function useGoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. Google 로그인 설정
      configureGoogleSignin();

      // 2. Google 계정 로그인
      const response = await GoogleSignin.signIn();

      // 3. 로그인 취소 확인
      if (!isSuccessResponse(response)) {
        return;
      }

      // 4. Google ID Token 추출
      const idToken = response.data.idToken;

      if (!idToken) {
        throw new Error("Google ID Token을 받지 못했습니다.");
      }

      // 5. Google 프로필 이름 가져오기
      const googleName = response.data.user.name?.trim();

      // 6. FastAPI 로그인 요청
      const result = await loginWithGoogle(idToken);

      // 7. 화면에 표시할 이름 결정
      const displayName = googleName || result.user.nickname;

      // 8. 로그인 결과 확인
      console.log("Lenary 로그인 성공");
      console.log("회원 ID:", result.user.user_id);
      console.log("신규 회원 여부:", result.is_new_user);
      console.log("표시 이름:", displayName);

      // 9. 로그인 성공 알림
      Alert.alert(
        "로그인 성공",
        `${displayName}님, 환영합니다!`
      );

      // TODO:
      // JWT SecureStore 저장
      // documents 화면 이동

    } catch (error) {
      // 사용자가 Google 로그인 취소
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
      // 로그인 처리 종료
      setIsLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    isLoading,
  };
}
