import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import Card from "../Card";
import "../../styles/Sliders.scss";

function Sliders({ cards = [] }) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    let indexSlide = currentSlide;
    setCurrentSlide((indexSlide += 1));
  };

  const previousSlide = () => {
    let indexSlide = currentSlide;
    setCurrentSlide((indexSlide -= 1));
  };

  const slideToShowResponsive = () => {
    const { deck } = useOutletContext();

    let slides;
    if (isDesktop) {
      slides = deck.length < 6 ? 1 : 5;
    } else if (isTablet) {
      slides = deck.length < 4 ? 1 : 3;
    } else {
      slides = 1;
    }
    return slides;
  };

  const settings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: slideToShowResponsive(),
    speed: 300,
    nextArrow: <NextArrow onClick={nextSlide} />,
    prevArrow: <PrevArrow onClick={previousSlide} />,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  return (
    <div className="wrapper-card">
      <Slider
        className={settings.className}
        centerMode={settings.centerMode}
        focusOnSelect={settings.focusOnSelect}
        infinite={settings.infinite}
        centerPadding={settings.centerPadding}
        slidesToShow={settings.slidesToShow}
        speed={settings.speed}
        nextArrow={settings.nextArrow}
        prevArrow={settings.prevArrow}
        beforeChange={settings.beforeChange}
      >
        {cards.map((item, index) => (
          <div
            key={item.cardId}
            role="button"
            tabIndex={index}
            className={`card-controller ${
              currentSlide === index ? "slick-current" : ""
            }`}
          >
            <Card key={item.cardId} card={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

Sliders.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      dbfId: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
    })
  ),
};

Sliders.defaultProps = {
  cards: [],
};

export default Sliders;
