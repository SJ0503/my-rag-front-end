import { styles } from "@/styles/uploading.styles";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploadingScreen() {
  const progress = 36;

  const handleComplete = () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.fileIconBox}>
          <Text style={styles.fileIcon}>▤</Text>
          <Text style={styles.fileType}>PDF</Text>
        </View>

        <Text style={styles.fileName}>
          머신러닝 기초 개념 정리.pdf
        </Text>

        <Text style={styles.description}>
          문서 내용을 분석하고 있어요.
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>{progress}%</Text>

        <View style={styles.indicatorContainer}>
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>

        <Pressable style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>
            임시로 업로드 완료하기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

