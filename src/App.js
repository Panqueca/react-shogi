import React, { useEffect, useState } from "react";
import Match from "./pages/Match";
import { getPieceComponentsByTheme } from "./utils/pieces/display";

const defaultTheme = "skin_1";

const App = () => {
  const [pieceSkin, setPieceSkin] = useState(defaultTheme);
  const [displayPieces, setDisplayPieces] = useState(null);

  useEffect(() => {
    setDisplayPieces(getPieceComponentsByTheme("skin_1"));
  }, [pieceSkin]);

  const changePieceSkin = newSkin => {
    setPieceSkin(newSkin);
  };

  return (
    <Match displayPieces={displayPieces} changePieceSkin={changePieceSkin} />
  );
};

export default App;
