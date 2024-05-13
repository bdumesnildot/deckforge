import { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useNavigate } from "react-router-dom";
import { decodeDeck, decodeHash } from "../../utils/deckString";
import Notification from "../Notification";
import "../../styles/LoadDeckButton.scss";

export default function LoadDeckButton({ setIsLoading }) {
  const { setDeck, setActiveHero, setCards, setPrevActiveHero, setIsWCS } =
    useOutletContext();

  const [editing, setEditing] = useState(false);
  const [hash, setHash] = useState("");

  const navigate = useNavigate();

  const hashError = () => {
    let error = false;
    let text = "";

    if (hash === "" || hash === undefined) {
      error = true;
      text = "Import Hash impossible! \n Input is empty!";
    } else if (decodeHash(hash) === undefined) {
      error = true;
      text = "This deck code don't exist!";
    }
    return { error, text };
  };

  const handleSendHash = () => {
    if (hash.toUpperCase() === "WILD") {
      setHash("");
      setIsWCS(true);
      navigate("/heroes-selection/");
      return Notification({ text: "Be welcome valiant Wilder" });
    }

    if (hashError().error) {
      setHash("");
      return Notification({ text: hashError().text });
    }

    const returnHash = async () => {
      setIsLoading(true);
      const promiseDeck = await decodeDeck(hash);
      setPrevActiveHero(promiseDeck.heroes);
      setActiveHero(promiseDeck.heroes);
      setCards(promiseDeck.cards);
      setDeck(promiseDeck.deck);
      setHash("");
      setEditing(false);
      setIsLoading(false);
      return promiseDeck;
    };

    return returnHash();
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendHash();
    setHash("");
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="load-form-container">
        <form onSubmit={handleSubmit} className="load-form">
          <input
            className="load-input"
            type="text"
            value={hash}
            onChange={(event) => setHash(event.target.value)}
          />
          <button
            type="button"
            className="btn load-btn-validation"
            onClick={handleSendHash}
          >
            LOAD
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="load-container">
      <button
        type="button"
        className="btn btn-load-deck"
        onClick={handleEditClick}
      >
        LOAD DECK
      </button>
    </div>
  );
}
LoadDeckButton.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
};
