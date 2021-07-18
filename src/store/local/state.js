import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";

const localState = createState({
  skin: "skin_1"
});

export function useLocalState() {
  const state = useState(localState);
  state.attach(Persistence("localState"));

  return {
    get skin() {
      return state.skin.get();
    },
    changeSkin(newSkin) {
      state.skin.set(newSkin);
    }
  };
}
