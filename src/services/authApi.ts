
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
