import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  fileIconBox: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.mint,
    borderRadius: 22,
  },

  fileIcon: {
    color: COLORS.green,
    fontSize: 29,
  },

  fileType: {
    color: COLORS.green,
    fontSize: 7,
    fontWeight: "700",
  },

  fileName: {
    marginTop: 30,
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: "700",
  },

  description: {
    marginTop: 8,
    color: COLORS.secondaryText,
    fontSize: 13,
  },

  progressTrack: {
    width: "100%",
    height: 6,
    marginTop: 30,
    overflow: "hidden",
    backgroundColor: "#E1E5E0",
    borderRadius: 4,
  },

  progressBar: {
    height: "100%",
    backgroundColor: COLORS.navy,
    borderRadius: 4,
  },

  progressText: {
    width: "100%",
    marginTop: 8,
    color: COLORS.secondaryText,
    fontSize: 13,
    textAlign: "right",
  },

  indicatorContainer: {
    flexDirection: "row",
    marginTop: 40,
    gap: 7,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9DDDA",
  },

  completeButton: {
    marginTop: 45,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: COLORS.navy,
    borderRadius: 12,
  },

  completeButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
});