import PromotedLance from "../src/PromotedLance";
import KinBase from "../src/kin_base";

describe("PromotedLance", () => {
  it("inherits from KinBase", () => {
    let ancestor = Object.getPrototypeOf(PromotedLance.prototype);

    expect(ancestor.constructor).toEqual(KinBase);
  });
});
