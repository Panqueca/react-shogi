import PromotedKnight from "../src/PromotedKnight";
import KinBase from "../src/kin_base";

describe("PromotedKnight", () => {
  it("inherits from KinBase", () => {
    let ancestor = Object.getPrototypeOf(PromotedKnight.prototype);

    expect(ancestor.constructor).toEqual(KinBase);
  });
});
