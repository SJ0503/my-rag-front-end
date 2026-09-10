import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "@/styles/login.styles";

export default function LoginScreen() {
  const handleTemporaryLogin = () => {
    router.replace({
      pathname: "/documents/[id]",
      params: {
        id: "1",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>업로드가 완료됐어요!</Text>

        <Text style={styles.subtitle}>
          계속 진행하려면 로그인해주세요.
        </Text>

        <Pressable
          style={[styles.loginButton, styles.googleButton]}
          onPress={handleTemporaryLogin}
        >
          <Text>Google로 계속하기</Text>
        </Pressable>

        <Pressable
          style={[styles.loginButton, styles.kakaoButton]}
          onPress={handleTemporaryLogin}
        >
          <Text>카카오로 계속하기</Text>
        </Pressable>

        <Pressable
          style={[styles.loginButton, styles.appleButton]}
          onPress={handleTemporaryLogin}
        >
          <Text style={{ color: "#FFFFFF" }}>
            Apple로 계속하기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}