import { createState, useState } from "@hookstate/core";
import {
  getPieceComponentsByTheme,
  getBoardConfigByTheme,
} from "../../utils/pieces/display";

const skinState = createState({
  skin: "skin_1",
  displayPieces: getPieceComponentsByTheme("skin_1"),
  boardConfig: getBoardConfigByTheme("skin_1"),
});

export function useSkinState() {
  const state = useState(skinState);

  return {
    get skin() {
      return state.skin.get();
    },
    get displayPieces() {
      return state.displayPieces.get();
    },
    get boardConfig() {
      return state.boardConfig.get();
    },
    changeSkin(newSkin) {
      state.skin.set(newSkin);
      state.displayPieces.set(getPieceComponentsByTheme(newSkin));
      state.boardConfig.set(getBoardConfigByTheme(newSkin));
    },
  };
}
