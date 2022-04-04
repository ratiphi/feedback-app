import PropTypes from "prop-types";

function Header({ text, bgColor, textColor }) {
  return (
    <header style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container">
        <h2>
          <a href="/" style={{ textDecoration: "none", color: "#fff" }}>
            {text}
          </a>
        </h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback",
  bgColor: "#21325E",
  textColor: "#F0F0F0",
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};
export default Header;
