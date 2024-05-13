import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function NextArrow({ onClick }) {
  return (
    <button type="button" className="custom-nextArrow" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
}

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextArrow;
