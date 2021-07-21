import { createState, useState } from "@hookstate/core";

const authState = createState({ jwtToken: null });

export function useAuthState() {
  const state = useState(authState);

  return {
    get token() {
      return state.jwtToken.get();
    },

    setToken(token) {
      state.jwtToken.set(token);
    },
  };
}
