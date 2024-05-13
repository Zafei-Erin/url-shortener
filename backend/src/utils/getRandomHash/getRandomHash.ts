import { HASH_LENGTH } from "../../config/defaults";

export const getRandomHash = (): string => {
  const all = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < HASH_LENGTH; i++) {
    const index = Math.floor(Math.random() * all.length);
    result += all[index];
  }
  return result;
};
