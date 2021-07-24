export function canPromoteByKind(kind) {
  const promotedKind =
    {
      FU: "TO",
      KY: "NY",
      KE: "NK",
      GI: "NG",
      KA: "UM",
      HI: "RY",
    }[kind] || kind;

  return promotedKind !== kind;
}
