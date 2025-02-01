import { hash, verify, type Options } from "@node-rs/argon2";

const hashOptions: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async function (password: string): Promise<string> {
  return await hash(password, hashOptions);
};

export const verifyHashedPassword = async function (password: string, hash: string): Promise<boolean> {
  return await verify(hash, password, hashOptions);
};
