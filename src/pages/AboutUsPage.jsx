import "../styles/AboutUsPage.scss";
import "../index.scss";
import aboutUsSvg from "../assets/svg/titleBanner/aboutUs.svg";
import teamSvg from "../assets/svg/titleBanner/team.svg";
import benoit from "../assets/images/avatar/benoit.png";
import olivier from "../assets/images/avatar/olivier.png";
import theo from "../assets/images/avatar/theo.png";
import henry from "../assets/images/avatar/henry.png";
import toto from "../assets/images/avatar/toto.png";

function AboutUsPage() {
  return (
    <div className="aboutUs">
      <div className="section">
        <div className="trait trait-left"> </div>
        <img className="aboutus-svg" src={aboutUsSvg} alt="aboutUs.svg" />
        <div className="trait trait-right"> </div>
      </div>
      <div className="about-us-section">
        <div className="who-are-us">
          <p className="title">Who are us?</p>
          <p>
            We are a team of 5 developers based in Bordeaux, France who are
            currently in the process of re-converting our skillsets. Our team is
            passionate about the game Hearthstone, and we are using our
            expertise in programming with React to simplify the deck creation
            process for players. As we embark on this exciting new journey, we
            are committed to delivering top-quality solutions that enhance the
            gaming experience for all players. We believe that our innovative
            approach to deck creation will revolutionize the way players enjoy
            the game.Thank you for considering our team for your next project,
            and we look forward to collaborating with you!
          </p>
        </div>
        <div className="our-project">
          <p className="title">Our project</p>
          <p>
            With our application, you can easily create your dream deck using
            all the available filtering options. We have ensured that our
            application offers a smooth and intuitive user experience, which
            makes creating your deck even more enjoyable. Our application
            features an animated visual display that allows you to view the
            cards in an aesthetic way. We have also implemented a functionality
            that allows you to directly import your deck into the official game
            or other deck builders. This way, you can easily export your deck
            and share it for an even more enriching gaming experience. We
            developed this application with a lot of passion and dedication, and
            we hope you will enjoy it as much as we do. Please do not hesitate
            to contact us for any questions or comments. We are happy to share
            our experience and expertise with all Hearthstone players.
          </p>
        </div>
      </div>
      <div className="aboutUs">
        <div className="section">
          <div className="trait trait-left"> </div>
          <img className="aboutus-svg" src={teamSvg} alt="team.svg" />
          <div className="trait trait-right"> </div>
        </div>
        <div className="image-container">
          <img src={benoit} alt="benoit.png" className="png" />
          <img src={olivier} alt="olivier.png" className="png" />
          <img src={theo} alt="theo.png" className="png" />
          <img src={henry} alt="henry.png" className="png" />
          <img src={toto} alt="toto.png" className="png" />
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
