import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

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
    marginTop: 24,
    color: COLORS.navy,
    fontSize: 23,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 10,
    color: COLORS.secondaryText,
    fontSize: 13,
  },

  loginButton: {
    width: "100%",
    height: 52,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },

  googleButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  kakaoButton: {
    backgroundColor: COLORS.kakao,
  },

  appleButton: {
    backgroundColor: COLORS.navy,
  },
});