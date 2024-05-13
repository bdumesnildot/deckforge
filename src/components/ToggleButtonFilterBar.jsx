import React, { useState } from "react";
import PropTypes from "prop-types";

function ToggleButtonFilterBar({ children, onClick = null }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`btn${active ? " active" : ""}`}
      style={!active ? { border: "1px solid #9d9d9d", color: "#b9babc" } : {}}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

ToggleButtonFilterBar.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

ToggleButtonFilterBar.defaultProps = {
  children: null,
};

export default ToggleButtonFilterBar;
