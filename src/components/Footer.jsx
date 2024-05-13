import { useOutletContext, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Footer.scss";

import CircleIndicator from "./CircleIndicator";

function Footer() {
  const { deck, openDeckPreview, setOpenDeckPreview } = useOutletContext();
  const [totalcardsInDeck, setTotalcardsInDeck] = useState(0);

  const location = useLocation();
  const isDeckBuilderPage = location.pathname.includes("/deck-builder/");

  useEffect(() => {
    const sum = deck.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalcardsInDeck(sum);
  }, [deck]);

  return (
    <div className="footer">
      <div className="indicatorContainer">
        {Array.from({ length: 7 }).map((none, i) => (
          <CircleIndicator
            key={`indicator${i + 1}`}
            cost={i}
            deck={deck}
            totalcardsInDeck={totalcardsInDeck}
          />
        ))}
      </div>
      <div className="leftSideContainer">
        <p>
          <span>{`${totalcardsInDeck}`}</span>/30
        </p>
        {isDeckBuilderPage && (
          <div className="cont">
            <button
              type="button"
              onClick={() => setOpenDeckPreview(!openDeckPreview)}
            >
              Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
