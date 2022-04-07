import { FaTimes, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({ item }) {
  const location = useLocation();
  const path = location.pathname;
  const [display] = useState(
    path === "/supersecretpagethatnoonewilleverfind" ? true : false
  );
  const { approveFeedback, disapproveFeedback, deleteFeedback } =
    useContext(FeedbackContext);
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      {display && <div className="approve-text">{item.approvalText}</div>}
      {display && (
        <button
          onClick={() => approveFeedback(item.id, item)}
          className="approve"
        >
          <FaThumbsUp color="green" />
        </button>
      )}
      {display && (
        <button
          onClick={() => disapproveFeedback(item.id, item)}
          className="disapprove"
        >
          <FaThumbsDown color="red" />
        </button>
      )}
      {display && (
        <button onClick={() => deleteFeedback(item.id)} className="close">
          <FaTimes color="gray" />
        </button>
      )}
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
