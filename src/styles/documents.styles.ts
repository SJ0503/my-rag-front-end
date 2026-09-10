import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 22,
    paddingBottom: 30,
  },

  title: {
    color: COLORS.navy,
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    color: COLORS.secondaryText,
    fontSize: 14,
  },

  uploadArea: {
    height: 180,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    borderRadius: 18,
  },

  uploadIcon: {
    color: COLORS.green,
    fontSize: 38,
    fontWeight: "500",
  },

  uploadTitle: {
    marginTop: 14,
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: "700",
  },

  uploadDescription: {
    marginTop: 8,
    color: COLORS.secondaryText,
    fontSize: 12,
  },

  uploadButton: {
    height: 52,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.navy,
    borderRadius: 14,
  },

  uploadButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 12,
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: "600",
  },

  documentCard: {
    minHeight: 74,
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
  },

  fileIconBox: {
    width: 42,
    alignItems: "center",
  },

  fileIcon: {
    color: COLORS.green,
    fontSize: 27,
  },

  fileType: {
    marginTop: 2,
    color: COLORS.green,
    fontSize: 7,
    fontWeight: "700",
  },

  documentInformation: {
    flex: 1,
    marginLeft: 10,
  },

  documentName: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "700",
  },

  documentDescription: {
    marginTop: 5,
    color: COLORS.secondaryText,
    fontSize: 11,
  },

  more: {
    color: COLORS.secondaryText,
    fontSize: 23,
  },

  bottomNavigation: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  navigationItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavigationIcon: {
    color: COLORS.navy,
    fontSize: 22,
  },

  navigationIcon: {
    color: COLORS.secondaryText,
    fontSize: 22,
  },

  activeNavigationText: {
    marginTop: 4,
    color: COLORS.navy,
    fontSize: 10,
    fontWeight: "700",
  },

  navigationText: {
    marginTop: 4,
    color: COLORS.secondaryText,
    fontSize: 10,
  },
});