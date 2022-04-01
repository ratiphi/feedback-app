import PropTypes from "prop-types";

function Card({ children, reverse }) {
  // This method is conditional styled classes
  // reverse && "reverse" = if reverse is true THEN also use class "reverse"
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>;

  // This method is conditional inline styling
  // return (
  //   <div
  //     className="card"
  //     style={{
  //       backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "#fff",
  //       color: reverse ? "#fff" : "#000",
  //     }}
  //   >
  //     {children}
  //   </div>
  // );
}

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
