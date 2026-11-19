
/**
 * Google 로그인 요청 데이터
 */
export interface GoogleLoginRequest {
  id_token: string;
}

/**
 * Lenary 사용자 정보
 */
export interface AuthUser {
  user_id: number;
  nickname: string;
}

/**
 * Google 로그인 응답 데이터
 */
export interface GoogleLoginResponse {
  message: string;
  access_token: string;
  token_type: string;
  is_new_user: boolean;
  user: AuthUser;
}
