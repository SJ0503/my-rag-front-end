
/**
 * Google 로그인 요청
 */
export interface GoogleLoginRequest {
  id_token: string;
}


/**
 * Google 로그인 응답
 */
export interface GoogleLoginResponse extends AuthTokenPair {
  message: string;
  is_new_user: boolean;
  user: AuthUser;
}


/**
 * 사용자 정보
 */
export interface AuthUser {
  user_id: number;
  nickname: string;
}

/**
 * Access + Refresh Token
 */
export interface AuthTokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
