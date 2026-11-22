import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

// 모든 버튼 이미지의 원본 비율(224:46)과 동일한 화면 비율.
const BUTTON_WIDTH = 263;
const BUTTON_HEIGHT = 54;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.navy,
    fontSize: 23,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
    color: COLORS.secondaryText,
    fontSize: 13,
  },
  buttonGroup: {
    width: BUTTON_WIDTH,
    marginTop: 30,
    alignItems: "center",
  },
  loginButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    marginBottom: 12,
    borderRadius: 9,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonImage: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    borderColor:"transparent",
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
  },
  appleButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
});
