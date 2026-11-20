
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import * as AppleAuthentication from "expo-apple-authentication";

import * as Crypto from "expo-crypto";

import { loginWithApple } from "@/services/authApi";
import { saveAuthTokens } from "@/storage/authStorage";


export function useAppleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 1. 로그인 요청마다 새로운 nonce 생성
      const rawNonce = Crypto.randomUUID();

      const hashedNonce =
        await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          rawNonce
        );

      // 2. Apple 네이티브 로그인
      const credential =
        await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
          nonce: hashedNonce,
        });

      if (!credential.identityToken) {
        throw new Error(
          "Apple Identity Token이 없습니다."
        );
      }

      // Apple은 이름을 최초 로그인에만 전달할 수 있음
      const name = [
        credential.fullName?.familyName,
        credential.fullName?.givenName,
      ].filter(Boolean).join("");

      // 3. FastAPI에서 Apple Token 검증
      const result = await loginWithApple(
        credential.identityToken,
        rawNonce,
        name || undefined
      );

      // 4. Lenary 토큰 두 개 저장
      await saveAuthTokens(result);

      console.log("[Apple] Lenary 로그인 성공");

      // 5. 문서 화면 이동
      router.replace("/documents");

    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ERR_REQUEST_CANCELED"
      ) {
        return;
      }

      console.error("[Apple] 로그인 실패:", error);

      Alert.alert(
        "Apple 로그인 실패",
        "로그인 과정에서 오류가 발생했습니다."
      );

    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAppleLogin,
    isLoading,
  };
}
