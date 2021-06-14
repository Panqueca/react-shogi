export const getDialogInfoByNotificationSlug = (notificationSlug, callback) => {
  if (notificationSlug === "PieceMovedToPromotionZone")
    return {
      title: "Promover?",
      confirmText: "Sim",
      cancelText: "Não",
      onConfirm: () => callback("PROMOTE"),
      onCancel: () => callback("DONT_PROMOTE")
    };

  return { title: null };
};
