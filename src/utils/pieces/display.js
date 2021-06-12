import skin_1 from "../../@shogi_pieces/skin_1_3d";

const skins = { skin_1 };

export const getPieceComponentsByTheme = skinTheme => {
  return skins[skinTheme];
};
