
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { styles } from "@/styles/login.styles";


import { useKakaoLogin } from "@/hooks/auth/useKakaoLogin";

import { useAppleLogin } from "@/hooks/auth/useAppleLogin";

import * as AppleAuthentication from "expo-apple-authentication";

export default function LoginScreen() {
  // Google 로그인 커스텀 Hook
  const { handleGoogleLogin, isLoading } = useGoogleLogin();
  const { handleKakaoLogin, isLoading: isKakaoLoading, } = useKakaoLogin();
  const { handleAppleLogin, isLoading: isAppleLoading, } = useAppleLogin();

  // 아직 구현하지 않은 로그인 방식
  const handleTemporaryLogin = () => {
    Alert.alert(
      "준비 중",
      "해당 소셜 로그인 기능은 아직 준비 중입니다."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* 로그인 제목 */}
        {/* <Text style={styles.title}>로그인</Text>
         */}
        <Text style={styles.title}>로그인 TEST</Text>

        <Text style={styles.subtitle}>
          계속 진행하려면 로그인해주세요.
        </Text>

        {/* Google 로그인 */}
        <Pressable
          style={[styles.loginButton, styles.googleButton]}
          onPress={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text>Google로 계속하기</Text>
          )}
        </Pressable>

        {/* Kakao 로그인 */}
        <Pressable
          style={[styles.loginButton, styles.kakaoButton]}
          onPress={handleKakaoLogin}
          disabled={isKakaoLoading}
        >
          {isKakaoLoading ? (
            <ActivityIndicator />
          ) : (
            <Text>카카오로 계속하기</Text>
          )}
        </Pressable>

        {/* Apple 로그인 */}
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
          }
          buttonStyle={
            AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          }
          cornerRadius={12}
          style={{
            width: "100%",
            height: 52,
          }}
          onPress={handleAppleLogin}
        />

      </View>
    </SafeAreaView>
  );
}
