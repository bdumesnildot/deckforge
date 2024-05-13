import PropTypes from "prop-types";

function CloseNotify({ closeToast }) {
  return (
    <button type="button" className="btn-close-overlay" onClick={closeToast}>
      {" "}
    </button>
  );
}
export default CloseNotify;

CloseNotify.propTypes = {
  closeToast: PropTypes.func.isRequired,
};
