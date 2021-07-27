import React from "react";
import GameTypeOptions from "../../components/GameTypeOptions";
import { WAIT_GAME } from "./types";

export function close(state, { slug }) {
  return state.dialogList.set((list) =>
    list.filter(({ slug: checkSlug }) => checkSlug !== slug),
  );
}

export function open(state, { slug, render, params }) {
  const { dismissCallback } = params || {};
  const list = state.dialogList.get();
  const filtered = list.filter(({ slug: checkSlug }) => checkSlug === slug);
  if (filtered[0]) return;
  return state.dialogList.set((current) => {
    return [
      ...current,
      {
        slug,
        render,
        onDismiss: () => {
          close(state, { slug });
          if (typeof dismissCallback === "function") dismissCallback();
        },
      },
    ];
  });
}

export function openNewGameDialog(state, { onClose }) {
  open(state, {
    slug: WAIT_GAME,
    render: () => (
      <div>
        <h3 style={{ padding: "15px 20px" }}>Start a New Battle</h3>
        <div style={{ padding: "0px 5px" }}>
          <GameTypeOptions closeModal={() => onClose(WAIT_GAME)} />
        </div>
      </div>
    ),
  });
}
