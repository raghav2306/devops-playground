import { add, subtract } from "../src/math";

describe("Math Utils", () => {
  test("adds two numbers", () => {
    expect(add(3, 2)).toBe(5);
  });

  test("subtracts two numbers", () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
