import { useNavigate, useOutletContext } from "react-router-dom";
import heroesList from "../data/heroesList";
import "../styles/HeroesSelectionPage.scss";

function HeroesSelectionPage() {
  const { setActiveHero, isWCS } = useOutletContext();
  const navigate = useNavigate();
  const handleClickInitialHero = (item) => {
    setActiveHero(item);
    navigate("/deck-builder/");
  };
  const handleKeyDown = (event, item) => {
    if (event.key === "Enter") {
      setActiveHero(item);
    }
  };
  return (
    <div className="hero-selection-container">
      <button
        type="button"
        className="btn btn-import-deck"
        onClick={() => navigate("/deck/")}
      >
        IMPORT DECK
      </button>
      <h2 className="text-heroSelection">OR SELECT A HERO:</h2>
      <div className="hero-list-container">
        {heroesList.map((hero) => (
          <div className="hero-panel" key={hero.id}>
            <button
              type="button"
              className="hero-btn"
              onKeyDown={(e) => handleKeyDown(e, hero)}
              onClick={() => handleClickInitialHero(hero)}
            >
              <img
                className="hero-image"
                src={isWCS ? `../../${hero.profilWCS}` : `../../${hero.profil}`}
                alt={hero.name}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroesSelectionPage;
