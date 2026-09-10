import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoBox: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 22,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  logoIcon: {
    color: COLORS.navy,
    fontSize: 42,
    fontWeight: "700",
  },

  title: {
    marginTop: 24,
    color: COLORS.navy,
    fontSize: 30,
    fontWeight: "800",
  },

  description: {
    marginTop: 10,
    color: COLORS.secondaryText,
    fontSize: 14,
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 5,
  },

  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.navy,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#B7BDC3",
  },
});