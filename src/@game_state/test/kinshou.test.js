import GoldGeneral from "../src/GoldGeneral";
import KinBase from "../src/kin_base";

describe("GoldGeneral", () => {
  it("inherits from KinBase", () => {
    let ancestor = Object.getPrototypeOf(GoldGeneral.prototype);

    expect(ancestor.constructor).toEqual(KinBase);
  });
});
