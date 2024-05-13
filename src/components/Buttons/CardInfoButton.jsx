import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import "../../styles/CardInfoButton.scss";

export default function CardInfoButton({ onClick }) {
  return (
    <button type="button" className="btn info" onClick={onClick}>
      <FontAwesomeIcon icon={faInfo} />
    </button>
  );
}

CardInfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
