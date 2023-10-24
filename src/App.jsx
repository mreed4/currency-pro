import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

import StartPage from "./StartPage";
import ConvertResults from "./ConvertResults";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src="./src/assets/Currencypro.png" alt="Currencypro" />
      </Link>
      <nav>
        <ul className="main-nave">
          <li>
            <Link to="/">Currency Converter</Link>
          </li>
          <li>
            <Link to="/">Features</Link>
          </li>
          <li>
            <Link to="/">Resources</Link>
          </li>
        </ul>
      </nav>
      <nav className="secondary-nav">
        <ul>
          <li>
            <Link to="/">Sign In</Link>
          </li>
          <li>
            <Link to="/">Learn More</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/convert/:baseToTarget" element={<ConvertResults />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
