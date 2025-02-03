import { argon2id, argon2Verify, type IArgon2Options } from "hash-wasm";

// The salt and password will be added in the hashPassword function
const defaultHashOptions: Omit<IArgon2Options, "salt" | "password"> = {
  hashLength: 32,
  memorySize: 19456,
  parallelism: 1,
  iterations: 2,
};

export const hashPassword = async function (password: string): Promise<string> {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);

  const hashedPassword = await argon2id({ ...defaultHashOptions, salt, password });
  return hashedPassword;
};

export const verifyHashedPassword = async function (password: string, hash: string): Promise<boolean> {
  return await argon2Verify({ hash, password });
};
