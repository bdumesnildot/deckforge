import PropTypes from "prop-types";
import React from "react";
import "../styles/CardDetails.scss";

function CardDetails({ card }) {
  return (
    <div className="card-details">
      <h2 className="card-name">{card.name}</h2>
      <h3 className="card-flavor">"{card.flavor}"</h3>
      <div className="card-properties">
        <div className="card-property">
          <p className="property-title">Artist :</p>
          <p>{card.artist}</p>
        </div>
        <div className="card-property">
          <p className="property-title">Set :</p>
          <p>{card.cardSet}</p>
        </div>
        <div className="card-property">
          <p className="property-title">Class :</p>
          <p>{card.playerClass}</p>
        </div>
        <div className="card-property">
          <p className="property-title">Type :</p>
          <p>{card.type}</p>
        </div>
        <div className="card-property">
          <p className="property-title">Rarity :</p>
          <p>{card.rarity}</p>
        </div>
      </div>
    </div>
  );
}
export default CardDetails;

CardDetails.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    cardSet: PropTypes.string.isRequired,
    playerClass: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
  }).isRequired,
};
