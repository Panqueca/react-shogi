import React, { useEffect, useState } from "react";
import Match from "./pages/Match";
import { useLocalState } from "./store/local/state";
import { getPieceComponentsByTheme } from "./utils/pieces/display";

const App = () => {
  const { skin } = useLocalState();
  const [displayPieces, setDisplayPieces] = useState(null);

  useEffect(() => {
    setDisplayPieces(getPieceComponentsByTheme(skin));
  }, [skin]);

  return <Match displayPieces={displayPieces} />;
};

export default App;
