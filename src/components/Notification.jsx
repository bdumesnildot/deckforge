import { toast, Slide } from "react-toastify";
import { Fragment } from "react";
import PropTypes from "prop-types";
import logo from "../assets/svg/hearthstone-icon-nb.svg";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Notification.scss";

function Notification({
  text = "",
  autoClose = 1000,
  hideProgressBar = false,
  closeButton = true,
  closeButtonClassName = "",
  pauseOnHover = true,
  draggable = true,
  position = "top-right",
  theme = "light",
}) {
  const notify = () => {
    toast(
      <div className="toast-card">
        <div className="header-toast">
          <img src={logo} alt="logo notification" />
        </div>
        <div className="content-toast">
          {text.split("\n").map((line, index) => (
            <Fragment key={line}>
              {line}
              {index !== text.split("\n").length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      </div>,
      {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick: true,
        pauseOnHover,
        closeButton,
        closeButtonClassName,
        draggable,
        progress: "",
        transition: Slide,
        theme,
      }
    );
  };

  return notify();
}

export default Notification;

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  autoClose: PropTypes.number.isRequired,
  hideProgressBar: PropTypes.bool.isRequired,
  closeButton: PropTypes.bool.isRequired,
  closeButtonClassName: PropTypes.string.isRequired,
  pauseOnHover: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};
