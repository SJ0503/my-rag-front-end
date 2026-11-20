
import * as SecureStore from "expo-secure-store";

import type { AuthTokenPair } from "@/types/auth";

const ACCESS_TOKEN_KEY = "lenary_access_token";
const REFRESH_TOKEN_KEY = "lenary_refresh_token";

/**
 * Access Token 저장
 */
export async function saveAccessToken(
  token: string
): Promise<void> {
  await SecureStore.setItemAsync(
    ACCESS_TOKEN_KEY,
    token
  );
}

/**
 * Access + Refresh Token 저장
 */
export async function saveAuthTokens(
  tokens: AuthTokenPair
): Promise<void> {
  if (!tokens.access_token || !tokens.refresh_token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  // 갱신된 Refresh Token부터 저장
  await SecureStore.setItemAsync(
    REFRESH_TOKEN_KEY,
    tokens.refresh_token
  );

  await saveAccessToken(tokens.access_token);
}

/**
 * Access Token 조회
 */
export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

/**
 * Refresh Token 조회
 */
export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

/**
 * Access Token 삭제
 */
export async function removeAccessToken(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

/**
 * 모든 인증 토큰 삭제
 */
export async function removeAuthTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ]);
}
