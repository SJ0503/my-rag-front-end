import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#F8F9F6",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="documents" />
        <Stack.Screen name="uploading" />
        <Stack.Screen name="documents/[id]" />
        <Stack.Screen name="mypage" />
      </Stack>
    </>
  );
}