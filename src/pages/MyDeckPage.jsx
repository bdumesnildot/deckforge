import { useMediaQuery } from "react-responsive";
import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CardDisplayer from "../components/CardDisplayer";
import Footer from "../components/Footer";
import TitleBanner from "../components/TitleBanner";
import ToggleButton from "../components/ToggleButton";
import OverlayCardDetails from "../components/OverlayCardDetails";
import LoadDeckButton from "../components/Buttons/LoadDeckButton";
import SaveDeckButton from "../components/Buttons/SaveDeckButton";
import Sliders from "../components/carousel/Sliders";
import "../styles/MyDeckPage.scss";
import CarouselDesktop from "../components/carousel/CarouselDesktop";

import loader from "../assets/images/cardback.png";
import placeholder from "../assets/images/no-deck-decoration.png";

function MyDeckPage() {
  const { deck, openOverlay, cardTarget, activeHero, isFancy, setIsFancy } =
    useOutletContext();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="deckPage-container">
      <div className="deckPage-flex-topContent">
        <div className="deckPage-btn-container">
          <div className="btn-container-left">
            <LoadDeckButton setIsLoading={setIsLoading} />
          </div>
          <div className="btn-container-right">
            {isDesktop && (
              <ToggleButton
                className="toggle-visualization"
                isFancy={isFancy}
                setIsFancy={setIsFancy}
              />
            )}
            <SaveDeckButton />
          </div>
        </div>
        <div className="title-banner">
          <TitleBanner activeHero={activeHero} />
        </div>
      </div>
      <div className="deckPage-flex-growContent">
        {!isFancy && deck.length !== 0 && <CardDisplayer cards={deck} />}
        {isFancy && !isDesktop && deck.length !== 0 && <Sliders cards={deck} />}
        {isFancy && isDesktop && deck.length !== 0 && <CarouselDesktop />}
        {deck.length === 0 && (
          <div className="no-deck-message">
            <h3>
              {isLoading
                ? `Be patient, your deck is loading...`
                : `Oh no! Your deck is empty.`}
            </h3>
            {!isLoading && (
              <>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    activeHero.name !== undefined
                      ? navigate("/deck-builder/")
                      : navigate("/heroes-selection/")
                  }
                >
                  Create a deck
                </button>
                <div className="no-deck-img">
                  <img src={placeholder} alt="Warrior on his knees." />
                </div>
              </>
            )}
            {isLoading && (
              <div className="cards-animated-container">
                <div className="cards-animated">
                  {Array.from({ length: 5 }).map((none, i) => (
                    <img
                      key={`carback ${i + 1}`}
                      className="cardback"
                      src={loader}
                      alt="Cardback Heartstone"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {deck.length !== 0 && !isFancy && (
        <div className="footer-container">
          <Footer deck={deck} />
        </div>
      )}
      {openOverlay && (
        <OverlayCardDetails
          card={cardTarget}
          isFancy={isFancy}
          setIsFancy={setIsFancy}
        />
      )}
    </div>
  );
}

export default MyDeckPage;
