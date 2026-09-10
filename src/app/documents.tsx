import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { styles } from "@/styles/documents.styles";

type Document = {
  id: number;
  name: string;
  type: string;
  description: string;
};

const documents: Document[] = [
  {
    id: 1,
    name: "머신러닝 기초 개념 정리.pdf",
    type: "PDF",
    description: "24페이지 · 2025년 8월 12일",
  },
  {
    id: 2,
    name: "운영체제 강의자료.pptx",
    type: "PPTX",
    description: "48페이지 · 2025년 8월 3일",
  },
];

export default function DocumentsScreen() {
  const handleUpload = () => {
    router.push("/uploading");
  };

  const handleSelectDocument = (id: number) => {
    router.push(`/documents/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>내 문서</Text>
        <Text style={styles.subtitle}>
          학습할 문서를 업로드해보세요.
        </Text>

        <Pressable style={styles.uploadArea} onPress={handleUpload}>
          <Text style={styles.uploadIcon}>⇧</Text>

          <Text style={styles.uploadTitle}>
            여기를 눌러 문서를 선택하세요
          </Text>

          <Text style={styles.uploadDescription}>
            PDF, DOCX, PPTX 파일을 지원해요.
          </Text>
        </Pressable>

        <Pressable style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>문서 업로드</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>최근 업로드</Text>

        {documents.map((document) => (
          <Pressable
            key={document.id}
            style={styles.documentCard}
            onPress={() => handleSelectDocument(document.id)}
          >
            <View style={styles.fileIconBox}>
              <Text style={styles.fileIcon}>▤</Text>
              <Text style={styles.fileType}>{document.type}</Text>
            </View>

            <View style={styles.documentInformation}>
              <Text style={styles.documentName} numberOfLines={1}>
                {document.name}
              </Text>

              <Text style={styles.documentDescription}>
                {document.description}
              </Text>
            </View>

            <Text style={styles.more}>⋮</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <View style={styles.navigationItem}>
          <Text style={styles.activeNavigationIcon}>▣</Text>
          <Text style={styles.activeNavigationText}>내 문서</Text>
        </View>

        <View style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>⌂</Text>
          <Text style={styles.navigationText}>홈</Text>
        </View>

        <View style={styles.navigationItem}>
          <Text style={styles.navigationIcon}>♙</Text>
          <Text style={styles.navigationText}>마이페이지</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

