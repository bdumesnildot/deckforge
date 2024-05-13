import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import "../styles/SearchBar.scss";

export default function SearchBar() {
  const { filteredCards, setFilteredSearchedCards } = useOutletContext();

  const [inputValue, setInputValue] = useState("");
  const [query, setquery] = useState("");

  useEffect(() => {
    const result = filteredCards.filter((card) => {
      return (
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.type.toLowerCase().includes(query.toLowerCase()) ||
        card.rarity.toLowerCase().includes(query.toLowerCase()) ||
        card.playerClass.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredSearchedCards(result);
  }, [query]);

  const handleClick = () => {
    setFilteredSearchedCards(filteredCards);
    setquery(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setquery(inputValue);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="searchbar-flex-container">
      <div className="button searchBar-container">
        <FontAwesomeIcon
          icon={faSearch}
          className="searchBar-icon"
          onClick={handleClick}
        />
        <input
          type="search"
          className="input-searchBar"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
