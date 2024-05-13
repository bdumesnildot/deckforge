import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import "../styles/OverlayInfo.scss";

function OverlayInfo() {
  const { openOverlayInfo, setOpenOverlayInfo } = useOutletContext();

  const closeOverlay = () => {
    setOpenOverlayInfo(false);
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
    <div className={`overlay-info ${openOverlayInfo ? "active" : ""}`}>
      <div className="modal-info">
        <div className="overlay-wrapper" role="button" tabIndex={0}>
          <button
            type="button"
            className="btn-close-overlay"
            onClick={() => closeOverlay()}
          >
            {" "}
          </button>
          <div className="overlay-info-content">
            <div className="info-wrapper">
              <div className="logo-info">
                <FontAwesomeIcon icon={faInfo} />
              </div>
              <h3 className="info-title">Info</h3>
            </div>
            <div className="info-text">
              <p>
                Welcome to our Hearthstone deck creation : <b>DeckForge</b>!
              </p>
              <p>
                {" "}
                Our app allows you to create your own deck for the online card
                game Hearthstone. You can add up to <b>two copies</b> of each
                card, <b>except for elite</b> cards which are limited to only
                one copy per deck.
              </p>
              <p>
                To <b>add</b> a card to your deck, <b>simply click</b> on it. If
                you can no longer add copies of a card, it will be{" "}
                <b>automatically greyed</b> out to signal this to you. <br />
              </p>
              <p>
                At the <b>bottom</b> of the page, you can see{" "}
                <b>useful statistics</b> to help you build a balanced deck. You
                can see how many cards you have at each cost tier, to ensure you
                have enough cards for each phase of the game.
              </p>
              <p>
                When you have finished creating your deck, you can <b>export</b>
                it to Hearthstone using our easy export feature. You can also{" "}
                <b>save</b>
                your deck for later use, or share it with other players to get
                feedback or suggestions.
              </p>
              <p>
                Feel free to use the <b>"Preview" button</b> on the right-hand
                sidebar to view your current deck at any time.
              </p>
              <p>
                We hope you enjoy our app and create <b>many amazing decks</b>{" "}
                to achieve victory in <b>Hearthstone</b>!
              </p>
            </div>
            <div className="info-understood">
              <button
                className="btn"
                onClick={() => closeOverlay()}
                type="button"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverlayInfo;
