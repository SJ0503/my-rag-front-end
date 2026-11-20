import * as SecureStore from "expo-secure-store";

// JWT 저장 키
const ACCESS_TOKEN_KEY = "lenary_access_token";

// JWT 저장
export async function saveAccessToken(
  token: string
): Promise<void> {
  console.log("[SecureStore] 저장 함수 실행됨");

  if (!token) {
    throw new Error("저장할 Access Token이 없습니다.");
  }

  console.log("[SecureStore] 저장 시작");

  await SecureStore.setItemAsync(
    ACCESS_TOKEN_KEY,
    token
  );

  console.log("[SecureStore] JWT 저장 완료");
}

// JWT 조회
export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

// JWT 삭제
export async function removeAccessToken(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}