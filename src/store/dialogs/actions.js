export function close(state, { slug }) {
  return state.dialogList.set((list) =>
    list.filter(({ slug: checkSlug }) => checkSlug !== slug),
  );
}

export function open(state, { slug, render, params }) {
  const { dismissCallback } = params;
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
