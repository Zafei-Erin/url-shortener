import { HASH_LENGTH, getRandomHash } from "./getRandomHash";

describe("getRandomHash", () => {
  it(`returns a hash of length of ${HASH_LENGTH}`, () => {
    expect(getRandomHash().length).toBe(HASH_LENGTH);
  });
  it(`returns a hash of length of ${HASH_LENGTH}`, () => {
    expect(getRandomHash().length).toBe(HASH_LENGTH);
  }); 
});
