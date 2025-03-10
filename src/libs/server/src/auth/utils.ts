import { deleteSessionCookie, getSessionCookieToken } from "./cookies";
import { cacheValidateSessionToken } from "./sessions";

export const generateAuthSessionToken = function () {
  return crypto.randomUUID();
};

const uint8ArrayToBase64 = function (array: Uint8Array): string {
  let binary = "";
  array.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
};

/* const base64ToUint8Array = function (base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}; */

const getEncryptedIV = async function (token: string) {
  const tokenBytes = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", tokenBytes);
  return new Uint8Array(hashBuffer.slice(0, 12));
};

const getEncryptedKey = async function (secretKey: string) {
  const secretKeyBytes = new TextEncoder().encode(secretKey);
  const secretKeyBuffer = await crypto.subtle.digest("SHA-256", secretKeyBytes);
  return await crypto.subtle.importKey("raw", secretKeyBuffer, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
};

export const encryptAuthSessionToken = async function (token: string, secretKey: string) {
  const key = await getEncryptedKey(secretKey);
  const iv = await getEncryptedIV(token);
  const encodedToken = new TextEncoder().encode(token);
  const encryptedToken = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedToken);
  const encryptedTokenBase64 = uint8ArrayToBase64(new Uint8Array(encryptedToken));
  return encryptedTokenBase64;
};

export const getUserSession = async function () {
  "use server";
  const sessionToken = await getSessionCookieToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }

  const { session, user } = await cacheValidateSessionToken(sessionToken);

  if (!session || !user) {
    await deleteSessionCookie();
  }

  return { session, user };
};
