
import {
    getAccessToken,
    getRefreshToken,
    removeAuthTokens,
    saveAuthTokens,
} from "@/storage/authStorage";

import {
    getMyProfile,
    refreshAuthTokens,
} from "@/services/authApi";

import { ApiHttpError } from "@/services/appClient";
import type { AuthUser } from "@/types/auth";

// 여러 요청이 동시에 Refresh Token을 갱신하지 않도록 관리
let refreshPromise: Promise<string> | null = null;

/**
 * Refresh Token을 이용한 Access Token 재발급
 */
export async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        throw new ApiHttpError(
          401,
          "Refresh Token이 없습니다."
        );
      }

      try {
        // FastAPI에 재발급 요청
        const tokens = await refreshAuthTokens(refreshToken);

        // 새 Access/Refresh Token 저장
        await saveAuthTokens(tokens);

        console.log("[Auth] 토큰 재발급 성공");

        return tokens.access_token;

      } catch (error) {
        // Refresh Token 자체가 유효하지 않은 경우
        if (
          error instanceof ApiHttpError &&
          (error.status === 401 || error.status === 403)
        ) {
          await removeAuthTokens();
        }

        // 네트워크 오류라면 저장된 토큰 유지
        throw error;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

/**
 * JWT 유효성 확인 + 필요 시 자동 재발급
 */
export async function getAuthenticatedProfile(): Promise<AuthUser> {
  let accessToken = await getAccessToken();

  // 저장된 Access Token이 없는 경우
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  try {
    // 기존 Access Token으로 사용자 조회
    return await getMyProfile(accessToken);

  } catch (error) {
    // Access Token 만료 시 재발급
    if (
      error instanceof ApiHttpError &&
      error.status === 401
    ) {
      // 다른 요청이 이미 갱신했는지 확인
      const latestToken = await getAccessToken();

      const newAccessToken =
        latestToken && latestToken !== accessToken
          ? latestToken
          : await refreshAccessToken();

      try {
        // 새로운 토큰으로 다시 요청
        return await getMyProfile(newAccessToken);

      } catch (retryError) {
        if (
          retryError instanceof ApiHttpError &&
          (retryError.status === 401 ||
            retryError.status === 403)
        ) {
          await removeAuthTokens();
        }

        throw retryError;
      }
    }

    // 계정이 비활성화된 경우
    if (
      error instanceof ApiHttpError &&
      error.status === 403
    ) {
      await removeAuthTokens();
    }

    throw error;
  }
}
