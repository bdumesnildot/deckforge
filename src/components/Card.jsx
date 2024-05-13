import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import {
  findCardInDeck,
  countQuantityCardsInDeck,
} from "../utils/deckFunctions";
import "../styles/Card.scss";

function Card({ card }) {
  const { img, name } = card;
  const { deck } = useOutletContext();
  const location = useLocation();
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef(null);

  const handleClick = () => {
    const existCard = findCardInDeck(deck, card);
    const countCardDeck = countQuantityCardsInDeck(deck);
    const isLocation = location.pathname === "/deck-builder/";

    if (isLocation && countCardDeck < 30) {
      if (
        existCard === -1 ||
        (deck[existCard].elite === undefined && deck[existCard].quantity < 2)
      ) {
        imgRef.current.classList.add("animate-pulse");
        setTimeout(() => {
          imgRef.current.classList.remove("animate-pulse");
        }, 500);
      }
    }
  };

  const handleMouseLeave = () => {
    setRotate({
      x: 0,
      y: 0,
    });
  };

  const handleMouseMove = (event) => {
    const deg = 20;
    const positionX =
      (event.nativeEvent.offsetX / imgRef.current.offsetWidth - 0.5) * 2;
    const positionY =
      (event.nativeEvent.offsetY / imgRef.current.offsetHeight - 0.5) * 2;
    setRotate({
      x: deg * positionY,
      y: deg * positionX,
    });
  };

  return (
    <div className="card">
      <div
        className="card-img"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
        role="button"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleClick();
          }
        }}
        onClick={handleClick}
        tabIndex={0}
      >
        <img
          src={img}
          alt={name}
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  card: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    cardSet: PropTypes.string.isRequired,
    flavor: PropTypes.string,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    playerClass: PropTypes.string,
    rarity: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
