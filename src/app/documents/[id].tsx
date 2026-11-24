import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 문서 상세 화면
export default function DocumentDetailScreen() {
  // URL에서 문서 ID 추출
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9F6" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          문서 상세 화면
        </Text>

        <Text style={{ marginTop: 12 }}>
          선택한 문서 ID: {id}
          문서기능 개발중입니다!
        </Text>
      </View>
    </SafeAreaView>
  );
}