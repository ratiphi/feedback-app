import { createContext, useState, useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback data
  const fetchFeedback = async () => {
    //const response = await fetch("/feedback?_sort=id&_order=desc");
    const response = await fetch("/feedback");
    const data = await response.json();
    //console.log(data);
    setFeedback(data);
    setIsLoading(false);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" }).catch((error) => {
        console.log(error);
      });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    }).catch((error) => {
      console.log(error);
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
    //console.log("from addFeedback", feedback);
  };

  // Update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Approve feedback
  const approveFeedback = async (id, item) => {
    //console.log("Approved", id, item);
    item.approved = true;
    item.approvalText = "Approved";
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).catch((error) => {
      console.log(error);
    });
    const updatedItem = await response.json();
    //console.log("Updated Item:", updatedItem);
    const oldItems = feedback.filter((item) => item.id !== id);
    //console.log("Old Items:", oldItems);
    setFeedback([updatedItem, ...oldItems]);
  };

  // Disapprove feedback
  const disapproveFeedback = async (id, item) => {
    //console.log("Disapproved", id, item);
    item.approved = false;
    item.approvalText = "Not Approved";
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).catch((error) => {
      console.log(error);
    });
    const updatedItem = await response.json();
    //console.log("Updated Item:", updatedItem);
    const oldItems = feedback.filter((item) => item.id !== id);
    //console.log("Old Items:", oldItems);
    setFeedback([updatedItem, ...oldItems]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        approveFeedback,
        disapproveFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
