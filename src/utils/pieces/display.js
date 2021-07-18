import skin_1 from "../../@shogi_pieces/skin_1_3d";
import skin_2 from "../../@shogi_pieces/skin_2_red_kanji";

const skins = { skin_1, skin_2 };

export const getPieceComponentsByTheme = skinTheme => {
  return skins[skinTheme];
};
