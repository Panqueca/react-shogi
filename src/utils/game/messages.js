import React from "react";
import CheckEffect from "../../components/CheckEffect";

export const getDialogInfoByNotificationSlug = (notificationSlug, callback) => {
  if (notificationSlug === "PieceMovedToPromotionZone")
    return {
      type: "dialog",
      title: "Promover?",
      confirmText: "Sim",
      cancelText: "Não",
      onConfirm: () => callback("PROMOTE"),
      onCancel: () => callback("DONT_PROMOTE")
    };

  if (notificationSlug === "KingInCheck")
    return {
      type: "effect",
      display: <CheckEffect text="Your King is In Check" />,
      delay: 500
    };

  if (notificationSlug === "OpponentKingInCheck")
    return {
      type: "effect",
      display: <CheckEffect text="CHECK" />,
      delay: 500
    };

  if (notificationSlug === "GAME_FOUND")
    return {
      type: "effect",
      display: <CheckEffect text="Opponent Found, the game will start..." />,
      delay: 1500
    };

  return { type: null };
};
