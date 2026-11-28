
import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 22,
  },

  title: {
    color: COLORS.navy,
    fontSize: 25,
    fontWeight: "800",
  },

  logoutButton: {
    height: 54,
    marginTop: 28,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: "600",
  },
});
