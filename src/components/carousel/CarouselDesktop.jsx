import { useEffect, useRef, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import deckforgeLogo from "../../assets/logo.png";
import "../../styles/CarouselDesktop.scss";

function CarouselDesktop({
  heightRadius = 680,
  widthImg = 250,
  heightImg = 200,
  isRotate = true,
  speedRotate = -60,
}) {
  const [radius, setRadius] = useState(heightRadius);
  const [initiat, setInitiat] = useState(false);
  const { deck, isFancy } = useOutletContext();
  const location = useLocation();
  const imgWidth = widthImg;
  const imgHeight = heightImg;
  const autoRotate = isRotate;
  const rotateSpeed = speedRotate;

  const odragRef = useRef(null);
  const ospinRef = useRef(null);
  const imgRefs = useRef([]);
  const groundRef = useRef(null);

  const isLocation = location.pathname === "/deck/";
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  function init(delayTime) {
    if (initiat) {
      const allElem = Array.from(ospinRef.current.children);
      for (let i = 0; i < allElem.length; i += 1) {
        allElem[i].style.transform = `rotateY(${
          i * (360 / allElem.length)
        }deg) translateZ(${radius}px)`;
        allElem[i].style.transition = "transform 1s";
        allElem[i].style.transitionDelay = `${
          delayTime || (allElem.length - i) / 4
        }s`;
      }
    }
  }

  useEffect(() => {
    if (isDesktop && isFancy && isLocation) {
      setInitiat(true);
    }
  }, []);

  useEffect(() => {
    const spinContainer = ospinRef.current;
    const ground = groundRef.current;

    // Populate imgRefs array with img elements
    const imgElements = Array.from(ospinRef.current.children);
    imgRefs.current = imgElements;

    if (imgElements.length > 0) {
      // Initialize the carousel with a delay of 1 second
      setTimeout(() => {
        init();
      }, 250);
    }

    // Size of images
    spinContainer.style.width = `${imgWidth}px`;
    spinContainer.style.height = `${imgHeight}px`;

    // Size of ground - depend on radius
    ground.style.width = `${radius * 3}px`;
    ground.style.height = `${radius * 3}px`;
  }, [initiat]);

  function playSpin(yes) {
    ospinRef.current.style.animationPlayState = `${yes ? "running" : "paused"}`;
  }

  // Auto spin
  useEffect(() => {
    if (ospinRef.current) {
      if (autoRotate) {
        const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
        ospinRef.current.style.animation = `${animationName} ${Math.abs(
          rotateSpeed
        )}s infinite linear`;
      } else {
        ospinRef.current.style.animation = "";
      }
    }
  }, [autoRotate, rotateSpeed, ospinRef]);

  let desX = 0;
  let desY = 0;
  let tX = 0;
  let tY = 0;

  function applyTranform() {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    // Apply the angle
    odragRef.current.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
  }

  function handlePointerDown(e) {
    clearInterval(odragRef.current.timer);
    let sX = e.clientX;
    let sY = e.clientY;
    playSpin(false);

    const handlePointerMove = (event) => {
      const nX = event.clientX;
      const nY = event.clientY;
      desX = nX - sX;
      desY = nY - sY;
      tX += desX * 0.1;
      tY += desY * 0.1;
      sX = nX;
      sY = nY;
      applyTranform(odragRef.current);
    };

    const handlePointerUp = () => {
      odragRef.current.timer = setInterval(() => {
        desX *= 0.95;
        desY *= 0.95;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odragRef.current);
        playSpin(false);
        if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
          clearInterval(odragRef.current.timer);
          playSpin(true);
        }
      }, 17);
      odragRef.current.removeEventListener("pointermove", handlePointerMove);
      odragRef.current.removeEventListener("pointerup", handlePointerUp);
    };

    odragRef.current.addEventListener("pointermove", handlePointerMove);
    odragRef.current.addEventListener("pointerup", handlePointerUp);
    e.preventDefault();
  }

  function handleWheel(e) {
    const d = e.deltaY / 20 || -e.details;
    const maxRadius = 550;
    const prevRadius = radius;
    setRadius(Math.max(maxRadius, prevRadius + d));
  }

  useEffect(() => {
    init(0.5);
  }, [radius]);

  return (
    <div className="carousel-wrapper">
      <div
        id="drag-container"
        ref={odragRef}
        onPointerDown={handlePointerDown}
        onWheel={handleWheel}
      >
        <div id="spin-container" ref={ospinRef}>
          {deck.map((item, index) => (
            <img
              key={item.dbfId}
              src={item.img}
              alt={item.name}
              className="image-card"
              ref={(el) => {
                if (el) {
                  imgRefs.current[index] = el;
                }
              }}
            />
          ))}
        </div>

        <div id="ground" ref={groundRef} />
        <div className="logo">
          <img src={deckforgeLogo} alt="logo deckforge" id="logo" />
        </div>
      </div>
    </div>
  );
}

export default CarouselDesktop;

CarouselDesktop.propTypes = {
  heightRadius: PropTypes.number,
  widthImg: PropTypes.number,
  heightImg: PropTypes.number,
  isRotate: PropTypes.bool,
  speedRotate: PropTypes.number,
};

CarouselDesktop.defaultProps = {
  heightRadius: 680,
  widthImg: 250,
  heightImg: 200,
  isRotate: true,
  speedRotate: -60,
};
