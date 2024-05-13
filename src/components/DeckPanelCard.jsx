import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/DeckPanelCard.scss";
import { useOutletContext } from "react-router-dom";
import {
  addUpdateDeck,
  removeQuantityCardToDeck,
  countQuantityCardsInDeck,
} from "../utils/deckFunctions";
import SaveDeckButton from "./Buttons/SaveDeckButton";

export default function DeckPanelCard() {
  const {
    deck,
    setDeck,
    openDeckPreview,
    setOpenDeckPreview,
    openOverlay,
    setOpenOverlay,
    setCardTarget,
  } = useOutletContext();

  const handleClickClose = () => {
    setOpenDeckPreview(!openDeckPreview);
  };

  const handleClickInfo = (card) => {
    setCardTarget(card);
    setOpenOverlay(!openOverlay);
  };

  return (
    <div className="deck-panel">
      <div className="deck-logo">
        <h2>DECK</h2>
      </div>
      <div className="card-list">
        {deck.map((item, index) => (
          <div className="card-deck" key={item.cardId}>
            <button
              type="button"
              className="info btn"
              onClick={() => handleClickInfo(item)}
            >
              <FontAwesomeIcon icon={faInfo} />
            </button>
            <div className="card-preview-image">
              <div className="card-text">{item.name}</div>
              <div className="card-count">{item.quantity}</div>
              <span
                className="btn-background-image"
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              />
            </div>
            <button
              type="button"
              className="add btn"
              onClick={() => addUpdateDeck(deck, setDeck, item)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              type="button"
              className="remove btn"
              onClick={() => removeQuantityCardToDeck(deck, setDeck, index)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        ))}
      </div>
      <div className="footer-panel">
        <div className="btn-save-deck">
          <SaveDeckButton />
        </div>
        <button
          type="button"
          className="btn-close-deck btn"
          onClick={() => handleClickClose()}
        >
          CLOSE
        </button>
        <div className="deck-quantity">
          <div>{countQuantityCardsInDeck(deck)}</div>
          <div>/ 30</div>
        </div>
      </div>
    </div>
  );
}
