import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "../../styles/DropDownButton.scss";
import DropDownOption from "./DropDownOption";

export default function DropDownButton({
  children,
  itemList,
  selectedOption,
  setSelectedOption,
}) {
  const [value, setValue] = useState(null);
  const [inputText, setInputText] = useState(selectedOption);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const itemsRef = useRef(null);
  const handleClickIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemsRef.current && !itemsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="btn-dropdown-container" ref={itemsRef}>
      <button
        type="button"
        ref={buttonRef}
        tabIndex={0}
        onKeyDown={handleClickIsOpen}
        className="btn-dropdown"
        onClick={() => handleClickIsOpen()}
        value={value}
      >
        <div className="btn-dropdown-text">
          {selectedOption !== undefined && selectedOption !== null
            ? `${children} : ${inputText}`
            : children}
        </div>
        <FontAwesomeIcon
          className={isOpen ? "rotateIcon" : ""}
          icon={faCaretDown}
        />
      </button>

      {isOpen && (
        <div className="dropdown-options-container">
          {itemList.map((item, index) => (
            <DropDownOption
              key={item.text}
              value={item.value}
              setValue={setValue}
              index={index}
              handleClickIsOpen={handleClickIsOpen}
              setInputText={setInputText}
            >
              {item.text}
            </DropDownOption>
          ))}
        </div>
      )}
    </div>
  );
}

DropDownButton.propTypes = {
  children: PropTypes.string.isRequired,
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
      ]).isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  setSelectedOption: PropTypes.func,
};

DropDownButton.defaultProps = {
  selectedOption: null,
  setSelectedOption: null,
};
