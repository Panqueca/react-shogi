import React from "react";
import { isMobile } from "react-device-detect";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { transparentize } from "polished";
import styled, { css } from "styled-components";
import Close from "../CloseIcon";

const StyledDialogOverlay = styled(DialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 1000;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const StyledDialogContent = styled(({ ...rest }) => (
  <DialogContent {...rest} />
)).attrs({
  "aria-label": "dialog",
})`
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: #eee;
    border: 1px solid #f1f1f1;
    box-shadow: 0 4px 8px 0 ${transparentize(0.95, "#000")};
    padding: 0px;
    width: 50vw;
    overflow-y: auto;
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? "flex-end" : "center")};

    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
      width:  85vw;
      ${
        mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `
      }
    `}
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: #000;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  z-index: 100;
`;

export default function Modal({
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
}) {
  return (
    <StyledDialogOverlay
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      unstable_lockFocusAcrossFrames={false}
    >
      <div style={{ position: "relative" }}>
        <CloseIcon onClick={onDismiss}>
          <CloseColor />
        </CloseIcon>
        <StyledDialogContent
          aria-label="dialog content"
          minHeight={minHeight}
          maxHeight={maxHeight}
          mobile={isMobile}
        >
          {children}
        </StyledDialogContent>
      </div>
    </StyledDialogOverlay>
  );
}
