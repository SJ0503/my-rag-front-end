
import { postJson } from "@/services/appClient";

import type {
  GoogleLoginRequest,
  GoogleLoginResponse,
} from "@/types/auth";


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

import { getJson } from "@/services/appClient";
import type { AuthUser } from "@/types/auth";

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
