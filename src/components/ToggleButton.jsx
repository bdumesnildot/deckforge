import React from "react";
import "../styles/ToggleButton.scss";
import PropTypes from "prop-types";

function ToggleButton({ isFancy, setIsFancy }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle-checkbox"
        checked={isFancy}
        onChange={() => setIsFancy(!isFancy)}
      />
      <span className="toggle-switch" />
      <span className="toggle-label">
        {isFancy ? "Fancy Visualisation" : "Basic Visualisation"}
      </span>
    </label>
  );
}

export default ToggleButton;

ToggleButton.propTypes = {
  isFancy: PropTypes.bool.isRequired,
  setIsFancy: PropTypes.func.isRequired,
};
