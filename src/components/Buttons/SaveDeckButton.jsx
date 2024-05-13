import { useOutletContext } from "react-router-dom";
import { copyToClipboard, encodeDeck } from "../../utils/deckString";
import Notification from "../Notification";

function SaveDeckButton() {
  const { deck, activeHero } = useOutletContext();

  const saveDeckHash = () => {
    if (deck.length === 0) {
      return Notification({ text: "No card in deck !" });
    }
    const hash = encodeDeck(deck, activeHero.name);
    copyToClipboard(hash);
    return Notification({
      text: `Hash desk copied to clipboard !`,
    });
  };
  return (
    <button className="btn" type="button" onClick={() => saveDeckHash()}>
      Save deck
    </button>
  );
}
export default SaveDeckButton;
