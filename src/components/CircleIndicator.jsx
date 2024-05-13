import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "../styles/CircleIndicator.scss";

function CircleIndicator({ cost }) {
  const { deck } = useOutletContext();
  const [counter, setCounter] = useState(0);
  const [ratio, setRatio] = useState(0);

  const countCardByCost = (list) => {
    const sum = list.reduce((acc, curr) => {
      let updatedAcc = acc;
      if (cost < 6) {
        if (curr.cost === cost) {
          updatedAcc += curr.quantity;
        }
      } else if (curr.cost >= cost) {
        updatedAcc += curr.quantity;
      }
      return updatedAcc;
    }, 0);
    return sum;
  };

  const animeProgressBar = (rat) => {
    const bar = document.querySelector(`#bar${cost}`);
    const r = bar.getAttribute("r");
    const c = Math.PI * r * 2;
    const pct = (1 - rat) * c;
    bar.style.strokeDashoffset = pct;
    return pct;
  };

  useEffect(() => {
    setCounter(countCardByCost(deck));
    setRatio(counter / 30);
    animeProgressBar(ratio);
  }, [deck, counter, ratio]);

  return (
    <div className="circleIndicator">
      <p className="counter">{counter}</p>
      <div className="progressBar">
        <svg
          id="svg"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          height="70px"
          width="70px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset="0"
          />
          <circle
            className="bar"
            id={`bar${cost}`}
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset="0"
          />
        </svg>
        <p className="cost">{cost === 6 ? `6+` : `${cost}`}</p>
      </div>
    </div>
  );
}

CircleIndicator.propTypes = {
  cost: PropTypes.number.isRequired,
};

export default CircleIndicator;
