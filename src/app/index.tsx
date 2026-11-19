import { styles } from "@/styles/loading.styles";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
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

