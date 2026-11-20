
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/loading.styles";


import { ApiHttpError } from "@/services/appClient";

import { getAuthenticatedProfile } from "@/services/authSession";


export default function LoadingScreen() {
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      const checkLogin = async () => {
        try {
          // JWT 확인 및 필요 시 자동 재발급
          await getAuthenticatedProfile();

          if (!cancelled) {
            console.log("[Auth] 자동 로그인 성공");
            router.replace("/documents");
          }

        } catch (error) {
          if (
            error instanceof ApiHttpError &&
            (error.status === 401 || error.status === 403)
          ) {
            console.log("[Auth] 재로그인 필요");
          } else {
            console.error("[Auth] 로그인 확인 실패:", error);
          }

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
