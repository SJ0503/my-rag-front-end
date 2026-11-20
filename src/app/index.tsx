
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/loading.styles";

import {
  getAccessToken,
  removeAccessToken,
} from "@/storage/authStorage";

import { ApiHttpError } from "@/services/appClient";
import { getMyProfile } from "@/services/authApi";


export default function LoadingScreen() {
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      const checkLogin = async () => {
        try {
          // 1. SecureStore에서 JWT 조회
          const accessToken = await getAccessToken();
          console.log(
            "[자동 로그인] 저장된 JWT 존재:",
            accessToken !== null
          );

          // 2. 저장된 토큰이 없으면 로그인 화면 이동
          if (!accessToken) {
            if (!cancelled) {
              router.replace("/login");
            }
            return;
          }

          // 3. FastAPI에서 JWT 유효성 확인
          await getMyProfile(accessToken);

          // 4. 인증 성공 시 문서 화면 이동
          if (!cancelled) {
            console.log("자동 로그인 성공");
            router.replace("/documents");
          }

        } catch (error) {
          if (error instanceof ApiHttpError && error.status === 401) {
            console.log("[Auth] JWT 만료 또는 인증 실패");
          } else {
            console.error("[Auth] 자동 로그인 오류:", error);
          }

          // JWT 만료 또는 인증 거부인 경우 삭제
          if (
            error instanceof ApiHttpError &&
            (error.status === 401 || error.status === 403)
          ) {
            try {
              await removeAccessToken();
            } catch (storageError) {
              console.error("JWT 삭제 실패:", storageError);
            }
          }

          // 로그인 화면으로 이동
          // 네트워크 오류라면 토큰은 유지
          if (!cancelled) {
            router.replace("/login");
          }
        }
      };

      void checkLogin();
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>▥</Text>
        </View>

        <Text style={styles.title}>Lenary</Text>

        <Text style={styles.description}>
          내 문서로 시작하는 AI 학습
        </Text>
      </View>
    </SafeAreaView>
  );
}
