import React from "react";
import PropTypes from "prop-types";
import "../../styles/DropDownOption.scss";

export default function DropDownOption({
  setValue,
  value,
  index,
  children,
  handleClickIsOpen,
  setInputText,
}) {
  const changeValue = () => {
    setValue(value);
    setInputText(children);
    handleClickIsOpen();
  };

  return (
    <div
      className="btn dropdown-option"
      role="option"
      aria-selected="false"
      type="button"
      tabIndex={index + 1}
      onKeyDown={changeValue}
      onClick={changeValue}
      data-value={value}
    >
      {children}
    </div>
  );
}

DropDownOption.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  handleClickIsOpen: PropTypes.func.isRequired,
  setInputText: PropTypes.func.isRequired,
};
