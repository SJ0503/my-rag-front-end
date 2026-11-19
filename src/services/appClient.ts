
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
