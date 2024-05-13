import { useNavigate } from "react-router-dom";
import "../styles/ErrorPage.scss";
import rogueSvg from "../assets/svg/titleBanner/error.svg";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <div className="titleBannerError">
        <div className="trait trait-left"> </div>
        <img src={rogueSvg} alt="error.svg" className="errorImg" />
        <div className="trait trait-right"> </div>
      </div>
      <div className="oops">Oops !</div>
      <p className="oopsTxt">
        Hero, the page you are looking for might have been removed had his name
        changed or is temporarily unavaible.
      </p>
      <button
        type="button"
        className="btn"
        onClick={() => navigate("/heroes-selection")}
      >
        Go to homepage
      </button>
    </div>
  );
}

export default ErrorPage;
