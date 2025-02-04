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

export const encryptAuthSessionToken = async function (token: string) {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedToken = new TextEncoder().encode(token);
  const encryptedToken = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedToken);
  const ivBase64 = uint8ArrayToBase64(iv);
  const encryptedTokenBase64 = uint8ArrayToBase64(new Uint8Array(encryptedToken));
  return `${ivBase64}:${encryptedTokenBase64}`;
};
