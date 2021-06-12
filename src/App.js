import React, { useEffect, useState } from "react";
import Demo from "./demo/Demo";
import { getPieceComponentsByTheme } from "./utils/pieces/display";

const defaultTheme = "skin_1";

const App = () => {
  const [pieceSkin, setPieceSkin] = useState(defaultTheme);
  const [pieceComponents, setPieceComponents] = useState(null);

  useEffect(() => {
    const newPieces = getPieceComponentsByTheme(pieceSkin);
    console.log({ newPieces });
    setPieceComponents(newPieces);
  }, [pieceSkin]);

  const changePieceSkin = newSkin => {
    setPieceSkin(newSkin);
  };

  return (
    <Demo pieceComponents={pieceComponents} changePieceSkin={changePieceSkin} />
  );
};

export default App;
