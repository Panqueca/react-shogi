import React, { Fragment } from "react";
import Modal from "../Modal";
import { useDialogState } from "../../store/dialogs/state";

const DialogProvider = () => {
  const { dialogList } = useDialogState();

  return (
    <Fragment>
      {dialogList.map(({ slug, render, onDismiss }) => {
        const children = render();
        return (
          <Modal key={slug} onDismiss={onDismiss} isOpen>
            {children}
          </Modal>
        );
      })}
    </Fragment>
  );
};

export default DialogProvider;
