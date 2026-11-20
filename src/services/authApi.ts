
import { postJson } from "@/services/appClient";

import type {
  GoogleLoginRequest,
  GoogleLoginResponse,
} from "@/types/auth";

import { getJson } from "@/services/appClient";
import type { AuthUser } from "@/types/auth";

import type { AuthTokenPair } from "@/types/auth";


/**
 * Google 로그인 API
 */
export async function loginWithGoogle(
  idToken: string
): Promise<GoogleLoginResponse> {

  // FastAPI 요청 데이터 구성
  const request: GoogleLoginRequest = {
    id_token: idToken,
  };

  // Google ID Token 전송
  return postJson<GoogleLoginResponse>(
    "/auth/google",
    request
  );
}


/**
 * JWT를 이용한 현재 로그인 회원 조회
 */
export async function getMyProfile(
  accessToken: string
): Promise<AuthUser> {
  return getJson<AuthUser>(
    "/auth/me",
    accessToken
  );
}




/**
 * Refresh Token으로 새 토큰 발급
 */
export async function refreshAuthTokens(
  refreshToken: string
): Promise<AuthTokenPair> {
  return postJson<AuthTokenPair>(
    "/auth/refresh",
    {
      refresh_token: refreshToken,
    }
  );
}

/**
 * 서버 로그인 세션 폐기
 */
export async function logoutFromServer(
  refreshToken: string
): Promise<void> {
  await postJson<{ message: string }>(
    "/auth/logout",
    {
      refresh_token: refreshToken,
    }
  );
}



