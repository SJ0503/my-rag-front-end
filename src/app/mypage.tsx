
import { router } from "expo-router";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLogout } from "@/hooks/auth/useLogout";
import { styles as navStyles } from "@/styles/documents.styles";
import { styles } from "@/styles/mypage.styles";

export default function MyPageScreen() {
  // 기존 로그아웃 Hook 재사용
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      {/* 마이페이지 콘텐츠 */}
      <View style={styles.content}>
        <Text style={styles.title}>
          마이페이지
        </Text>

        {/* 로그아웃 버튼 */}
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
          accessibilityRole="button"
          accessibilityLabel="로그아웃"
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#D95D39" />
          ) : (
            <Text style={styles.logoutText}>
              로그아웃
            </Text>
          )}
        </Pressable>
      </View>

      {/* 하단 네비게이션 */}
      <View style={navStyles.bottomNavigation}>
        {/* 내 문서로 이동 */}
        <Pressable
          style={navStyles.navigationItem}
          onPress={() => router.replace("/documents")}
          accessibilityRole="button"
          accessibilityLabel="내 문서"
        >
          <Text style={navStyles.navigationIcon}>▣</Text>
          <Text style={navStyles.navigationText}>
            내 문서
          </Text>
        </Pressable>

        {/* 현재 화면: 마이페이지 */}
        <View style={navStyles.navigationItem}>
          <Text style={navStyles.activeNavigationIcon}>
            ♙
          </Text>
          <Text style={navStyles.activeNavigationText}>
            마이페이지
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
