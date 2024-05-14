import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      label="previousButton"
      className="custom-prevArrow"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PrevArrow;
