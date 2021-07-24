import skin_1 from "../../@shogi_pieces/skin_1_3d";
import skin_2 from "../../@shogi_pieces/skin_2_red_kanji_bold";

const skins = { skin_1, skin_2 };

export const getPieceComponentsByTheme = (skinTheme) => {
  return skins[skinTheme];
};

export const getBoardConfigByTheme = (skinTheme) => {
  if (skinTheme === "skin_2")
    return {
      squaresColor: "#cba84b",
      pieceViewBox: { hand: "0 0 50 50", board: "-2 0 60 60" },
    };

  return {
    squaresColor: "#f4c64e",
    pieceViewBox: { hand: "0 0 32 32", board: "-2 0 40 40" },
  };
};
