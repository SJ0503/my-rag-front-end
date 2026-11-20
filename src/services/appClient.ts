
// FastAPI 기본 서버 주소
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;


/**
 * FastAPI POST 요청 공통 함수
 */
export async function postJson<T>(
  endpoint: string,
  data: unknown
): Promise<T> {

  // 서버 주소 설정 확인
  if (!API_BASE_URL) {
    throw new Error("FastAPI 서버 주소가 설정되지 않았습니다.");
  }

  // FastAPI 서버에 POST 요청
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // JSON 응답 변환
  const result = await response.json();

  // HTTP 오류 발생 시 예외 처리
  if (!response.ok) {
    throw new Error(
      typeof result.detail === "string"
        ? result.detail
        : `API 요청 실패 (${response.status})`
    );
  }

  return result as T;
}



/**
 * HTTP 상태 코드를 포함하는 API 오류
 */
export class ApiHttpError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiHttpError";
  }
}

/**
 * JWT 인증이 필요한 GET 요청
 */
export async function getJson<T>(
  endpoint: string,
  accessToken: string
): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
    ?.trim()
    .replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("FastAPI 서버 주소가 설정되지 않았습니다.");
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseText = await response.text();

  let result: unknown = null;

  if (responseText) {
    try {
      result = JSON.parse(responseText);
    } catch {
      // JSON이 아닌 오류 응답도 처리하기 위해
      // 여기서는 파싱 실패를 허용한다.
    }
  }

  if (!response.ok) {
    let message = `API 요청 실패 (${response.status})`;

    if (
      result !== null &&
      typeof result === "object" &&
      "detail" in result &&
      typeof result.detail === "string"
    ) {
      message = result.detail;
    }

    throw new ApiHttpError(response.status, message);
  }

  if (result === null) {
    throw new Error("서버에서 올바른 JSON 응답을 받지 못했습니다.");
  }

  return result as T;
}
