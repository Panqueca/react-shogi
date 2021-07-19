import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";
import Cookies from "js-cookie";

const authState = createState({ sessionId: null });

export function useAuthState() {
  const state = useState(authState);
  state.attach(Persistence("authState"));

  return {
    get sessionId() {
      return state.sessionId.get();
    },

    updateSession() {
      const newSessionId = Cookies.get("connect.sid");
      state.sessionId.set(newSessionId);
    }
  };
}
