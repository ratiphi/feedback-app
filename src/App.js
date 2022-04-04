//import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
//import FeedbackData from "./data/FeedbackData";
import AboutIconLink from "./components/AboutIconLink";
import AboutPage from "./pages/AboutPage";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  //const [feedback, setFeedback] = useState([]);
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/supersecretpagethatnoonewilleverfind"
              element={
                <>
                  <h3>Admin Console</h3>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
