import KingSente from "../src/KingSente";
import KingBase from "../src/ou_base";

describe("KingSente", () => {
  it("inherits from KingBase", () => {
    let ancestor = Object.getPrototypeOf(KingSente.prototype);
    expect(ancestor.constructor).toEqual(KingBase);
  });
});
