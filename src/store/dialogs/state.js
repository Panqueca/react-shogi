import { createState, useState } from "@hookstate/core";
import { close, open } from "./actions";

export const WAIT_GAME = "WAIT_GAME";

const dialogState = createState({
  dialogList: [],
});

export function useDialogState() {
  const state = useState(dialogState);

  return {
    get dialogList() {
      return state.dialogList.get();
    },
    closePopup(slug) {
      close(state, { slug });
    },
    openPopup(slug, render, params = {}) {
      open(state, { slug, render, params });
    },
  };
}
