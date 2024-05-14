import PropTypes from "prop-types";
import { useLocation, useOutletContext } from "react-router-dom";
import { addUpdateDeck, findCardInDeck } from "../utils/deckFunctions";
import Card from "./Card";
import "../styles/CardDisplayer.scss";
import CardInfoButton from "./Buttons/CardInfoButton";

function CardDisplayer({ cards }) {
  const { deck, setDeck, openOverlay, setOpenOverlay, setCardTarget } =
    useOutletContext();
  const location = useLocation();

  const handleClickCard = (card) => {
    addUpdateDeck(deck, setDeck, card);
  };

  const handleClickInfo = (e, card) => {
    e.stopPropagation();
    setCardTarget(card);
    setOpenOverlay(!openOverlay);
  };

  const verifyQuantityByCard = (deckCard, card) => {
    const existCard = findCardInDeck(deckCard, card);
    return (
      existCard !== -1 &&
      ((deckCard[existCard].elite === undefined &&
        deckCard[existCard].quantity === 2) ||
        (deckCard[existCard].elite && deckCard[existCard].quantity === 1))
    );
  };

  return (
    <div className="card-container">
      {cards.map((item, index) => (
        <div
          className="card-controller"
          key={item.cardId}
          onClick={() => handleClickCard(item)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleClickCard(item);
            }
          }}
          role="button"
          label="checkQuantityButton"
          tabIndex={index}
          style={{
            filter:
              verifyQuantityByCard(deck, item) && location.pathname !== "/deck/"
                ? "grayscale(100%)"
                : "none",
          }}
        >
          <CardInfoButton
            item={item}
            onClick={(e) => handleClickInfo(e, item)}
          />
          <Card key={item.cardId} card={item} />
        </div>
      ))}
    </div>
  );
}

export default CardDisplayer;

CardDisplayer.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.string.isRequired,
      dbfId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cardSet: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rarity: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      flavor: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      playerClass: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};
