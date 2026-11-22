import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import * as AppleAuthentication from "expo-apple-authentication";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppleLogin } from "@/hooks/auth/useAppleLogin";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { useKakaoLogin } from "@/hooks/auth/useKakaoLogin";
import { styles } from "@/styles/login.styles";

export default function LoginScreen() {
  // 인증 Hook과 기존 JWT 발급·저장 흐름은 건드리지 않는다.
  const { handleGoogleLogin, isLoading: isGoogleLoading } = useGoogleLogin();
  const { handleKakaoLogin, isLoading: isKakaoLoading } = useKakaoLogin();
  const { handleAppleLogin, isLoading: isAppleLoading } = useAppleLogin();

  const isLoginLoading =
    isGoogleLoading || isKakaoLoading || isAppleLoading;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>로그인</Text>
        <Text style={styles.subtitle}>계속 진행하려면 로그인해주세요.</Text>

        <View style={styles.buttonGroup}>
          {/* Google: G 로고 + 한글 문구를 하나의 PNG로 만든 버튼 */}
          <Pressable
            style={[styles.loginButton, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={isLoginLoading}
            accessibilityRole="button"
            accessibilityLabel="Google로 로그인"
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#202124" />
            ) : (
              <Image
                source={require("../../assets/images/social/google-login-kr.png")}
                style={[
                  styles.buttonImage,
                  {
                    transform: [{ scale: 1.06 }],
                  },
                ]}
                resizeMode="stretch"
              />
            )}
          </Pressable>

          {/* Kakao: 사용자가 제공한 공식 한글 PNG 원본 */}
          <Pressable
            style={[styles.loginButton, styles.kakaoButton]}
            onPress={handleKakaoLogin}
            disabled={isLoginLoading}
            accessibilityRole="button"
            accessibilityLabel="카카오 로그인"
          >
            {isKakaoLoading ? (
              <ActivityIndicator color="#191919" />
            ) : (
              <Image
                source={require("../../assets/images/social/kakao-login-kr.png")}
                style={styles.buttonImage}
                resizeMode="stretch"
              />
            )}
          </Pressable>

          {/* Apple: 공식 네이티브 버튼. 한국어 iOS에서 한국어로 자동 표시. */}
          <View pointerEvents={isLoginLoading ? "none" : "auto"}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={9}
              style={styles.appleButton}
              onPress={handleAppleLogin}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
