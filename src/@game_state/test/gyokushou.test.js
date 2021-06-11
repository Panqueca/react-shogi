import KingGote from "../src/KingGote";
import KingBase from "../src/ou_base";

describe("KingGote", () => {
  it("inherits from KingBase", () => {
    let ancestor = Object.getPrototypeOf(KingGote.prototype);
    expect(ancestor.constructor).toEqual(KingBase);
  });
});
