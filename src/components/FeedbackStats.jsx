//import PropTypes from "prop-types";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  //console.log(feedback);
  // Calculate ratings average
  let filteredFeedback = feedback.filter((item) => {
    return item.approved === true;
  });

  //console.log(filteredFeedback);

  let average =
    filteredFeedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / filteredFeedback.length;
  average = average.toFixed(1).replace(/[.,]0$/, "");
  return (
    <div className="feedback-stats">
      <h4>{filteredFeedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
}

// FeedbackStats.propTypes = {
//   feedback: PropTypes.array.isRequired,
// };

export default FeedbackStats;
