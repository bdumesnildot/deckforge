import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import "../styles/DeckBuilderPage.scss";

import loader from "../assets/svg/hearthstone-icon-nb.svg";

import CardDisplayer from "../components/CardDisplayer";
import Footer from "../components/Footer";
import TitleBanner from "../components/TitleBanner";
import NavbarSecondary from "../components/Navbars/NavbarSecondary";
import DeckPanelCard from "../components/DeckPanelCard";
import OverlayCardDetails from "../components/OverlayCardDetails";
import HeroesSelectionButton from "../components/Buttons/HeroesSelectionButton";
import SearchBar from "../components/SearchBar";
import NavbarTertiary from "../components/Navbars/NavbarTertiary";
import Sliders from "../components/carousel/Sliders";
import { getAllCardsFiltered } from "../utils/apiRequests";
import OverlayInfo from "../components/OverlayInfo";

function DeckBuilderPage() {
  const {
    cards,
    activeHero,
    setCards,
    setDeck,
    filteredCards,
    setFilteredCards,
    filteredSearchedCards,
    setFilteredSearchedCards,
    openDeckPreview,
    openOverlay,
    cardTarget,
    activeSelectHeroBtn,
    activeSearch,
    activeFilter,
    prevActiveHero,
    setPrevActiveHero,
    isFancy,
    firstConnexion,
    setFirstConnexion,
    openOverlayInfo,
    setOpenOverlayInfo,
    neutralsCards,
    setNeutralsCards,
  } = useOutletContext();

  const isTabletMobile = useMediaQuery({ maxWidth: 1023 });

  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (firstConnexion && mounted) {
      setFirstConnexion(false);
      setOpenOverlayInfo(true);
    }
    return () => {
      setMounted(false);
    };
  }, [firstConnexion, mounted]);

  useEffect(() => {
    if (prevActiveHero !== activeHero) {
      setIsLoading(true);
      getAllCardsFiltered(activeHero.name, neutralsCards)
        .then((item) => {
          if (neutralsCards.length === 0) {
            setNeutralsCards(item.neutralCardsSet);
          }
          setCards(item.filteredCards);

          setIsLoading(false);
        })
        .catch((err) => console.error(err));

      setPrevActiveHero(activeHero);
      setDeck([]);
    }
  }, [activeHero, prevActiveHero]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  useEffect(() => {
    setFilteredSearchedCards(filteredCards);
  }, [filteredCards]);

  return (
    <div className="deckBuilderPage">
      <div className="deckBuilderPage-flex-topContent">
        <div className="tabletMobile-opt-container">
          {isTabletMobile && activeSelectHeroBtn && <HeroesSelectionButton />}
          {isTabletMobile && activeSearch && <SearchBar />}
        </div>
        {isTabletMobile && activeFilter && <NavbarTertiary />}
        <NavbarSecondary />
        <TitleBanner />
      </div>
      <div className="deckBuilderPage-flex-growContent">
        {isLoading && (
          <img className="loading-icon" src={loader} alt="hearthStone icon" />
        )}
        {!isLoading && !isFancy && (
          <CardDisplayer cards={filteredSearchedCards} />
        )}
        {!isLoading && isFancy && <Sliders cards={filteredSearchedCards} />}
      </div>
      <Footer />
      {openDeckPreview && <DeckPanelCard />}
      {openOverlay && <OverlayCardDetails card={cardTarget} />}
      {openOverlayInfo && <OverlayInfo isLoading={isLoading} />}
    </div>
  );
}

export default DeckBuilderPage;
