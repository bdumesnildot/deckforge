import PropTypes from "prop-types";
import helmetIcon from "../../assets/helmetIcon.svg";

function HeroButtonMenu({ activeSelectHeroBtn, setActiveSelectHeroBtn }) {
  const handleClick = () => {
    setActiveSelectHeroBtn(!activeSelectHeroBtn);
  };

  return (
    <div className="nav-icon">
      <button
        type="button"
        onClick={() => handleClick()}
        className="navbar-btn"
      >
        <img className="helmet-icon-img" src={helmetIcon} alt="heroes icon" />
      </button>
    </div>
  );
}

HeroButtonMenu.propTypes = {
  activeSelectHeroBtn: PropTypes.bool.isRequired,
  setActiveSelectHeroBtn: PropTypes.func.isRequired,
};

export default HeroButtonMenu;
