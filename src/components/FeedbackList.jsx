import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./shared/Spinner";
//import PropTypes from "prop-types";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);
  const location = useLocation();
  const path = location.pathname;
  const [adminDisplay] = useState(
    path === "/supersecretpagethatnoonewilleverfind" ? true : false
  );
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>;
  } else if (adminDisplay) {
    return isLoading ? (
      <Spinner />
    ) : (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={item.id} item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  } else {
    return isLoading ? (
      <Spinner />
    ) : (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback
            .filter((item) => {
              return item.approved === true;
            })
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FeedbackItem key={item.id} item={item} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    );
  }
}

// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//     })
//   ),
// };

export default FeedbackList;
