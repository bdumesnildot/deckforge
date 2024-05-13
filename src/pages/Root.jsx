import { useNavigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/Navbars/NavBar";
import CloseNotify from "../components/CloseNotify";

import "../index.scss";
import "react-toastify/dist/ReactToastify.css";

function Root() {
  const [activeHero, setActiveHero] = useState({});
  const [prevActiveHero, setPrevActiveHero] = useState(activeHero);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filteredSearchedCards, setFilteredSearchedCards] = useState([]);
  const [deck, setDeck] = useState([]);

  const [isFancy, setIsFancy] = useState(false);
  const [activeSelectHeroBtn, setActiveSelectHeroBtn] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const [openDeckPreview, setOpenDeckPreview] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [cardTarget, setCardTarget] = useState(false);

  const [firstConnexion, setFirstConnexion] = useState(true);
  const [openOverlayInfo, setOpenOverlayInfo] = useState(false);
  const [isWCS, setIsWCS] = useState(false);

  const [neutralsCards, setNeutralsCards] = useState([]);

  /* Redirecting automaticaly to the hero selection */
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/heroes-selection/");
  }, []);

  return (
    <div>
      <NavBar
        isFancy={isFancy}
        setIsFancy={setIsFancy}
        activeSelectHeroBtn={activeSelectHeroBtn}
        setActiveSelectHeroBtn={setActiveSelectHeroBtn}
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeHero={activeHero}
      />
      <Outlet
        context={{
          activeHero,
          setActiveHero,
          cards,
          setCards,
          filteredCards,
          setFilteredCards,
          filteredSearchedCards,
          setFilteredSearchedCards,
          deck,
          setDeck,
          openDeckPreview,
          setOpenDeckPreview,
          openOverlay,
          setOpenOverlay,
          cardTarget,
          setCardTarget,
          isFancy,
          setIsFancy,
          activeSelectHeroBtn,
          setActiveSelectHeroBtn,
          activeSearch,
          setActiveSearch,
          activeFilter,
          setActiveFilter,
          prevActiveHero,
          setPrevActiveHero,
          firstConnexion,
          setFirstConnexion,
          openOverlayInfo,
          setOpenOverlayInfo,
          isWCS,
          setIsWCS,
          neutralsCards,
          setNeutralsCards,
        }}
      />
      <ToastContainer closeButton={CloseNotify} />
    </div>
  );
}

export default Root;
