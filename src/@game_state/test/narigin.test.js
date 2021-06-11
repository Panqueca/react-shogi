import PromotedSilverGeneral from "../src/PromotedSilverGeneral";
import KinBase from "../src/kin_base";

describe("PromotedSilverGeneral", () => {
  it("inherits from KinBase", () => {
    let ancestor = Object.getPrototypeOf(PromotedSilverGeneral.prototype);

    expect(ancestor.constructor).toEqual(KinBase);
  });
});
