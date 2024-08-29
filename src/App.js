import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const TummyTuck = () => <h2>TummyTuck Page</h2>;
const BBL = () => <h2>BBL Page</h2>;
const BreastAug = () => <h2>Breast Aug. Page</h2>;
const BreastLift = () => <h2>Breast Lift Page</h2>;
const BreastReduction = () => <h2>Breast Reduction Page</h2>;
const Unknown = () => <h2>Unknown Page</h2>;

function App() {
  return (
    <Router>
      <div
        style={{
          width: "100svw",
          height: "100svh",
          display: "flex",
        }}
      >
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/tummy-tuck">Tummy Tuck</Link>
            </li>
            <li>
              <Link to="/butt">BBL</Link>
            </li>
            <li>
              <Link to="/breast-aug">Breast Augmentation</Link>
            </li>
            <li>
              <Link to="/breast-lift">Breast Lift</Link>
            </li>
            <li>
              <Link to="/breastreduction">Breast Reduction</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tummy-tuck" element={<TummyTuck />} />
          <Route path="/butt" element={<BBL />} />
          <Route path="/breast-aug" element={<BreastAug />} />
          <Route path="/breast-lift" element={<BreastLift />} />
          <Route path="/breastreduction" element={<BreastReduction />} />
          <Route path="*" element={<Unknown />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
