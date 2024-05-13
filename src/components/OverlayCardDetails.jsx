import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Card from "./Card";
import CardDetails from "./CardDetails";
import "../styles/OverlayCardDetails.scss";

function OverlayCardDetails({ card }) {
  const { openOverlay, setOpenOverlay } = useOutletContext();

  const closeOverlay = () => {
    setOpenOverlay(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        closeOverlay();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOverlay]);

  return (
    <div className={`overlay-card ${openOverlay ? "active" : ""}`}>
      <div className="overlay-wrapper" role="button" tabIndex={0}>
        <div className="overlay-header">
          <button
            type="button"
            className="btn-close-overlay"
            onClick={() => closeOverlay()}
          >
            {" "}
          </button>
        </div>
        <div className="overlay-content">
          <div className="card-display">
            <Card card={card} />
          </div>
          <div className="card-info">
            <CardDetails card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverlayCardDetails;

OverlayCardDetails.propTypes = {
  card: PropTypes.shape({
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
  }).isRequired,
};
