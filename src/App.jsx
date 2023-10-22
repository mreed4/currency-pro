import { useState } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import StartPage from "./StartPage";

function Header() {
  return (
    <header>
      <h1>Currencypro</h1>
      <nav>
        <ul className="main-nave">
          <li>
            <Link to="/currency-pro/">Currency Converter</Link>
          </li>
          <li>
            <Link to="/currency-pro/">Features</Link>
          </li>
          <li>
            <Link to="/currency-pro/">Resources</Link>
          </li>
        </ul>
      </nav>
      <nav className="secondary-nav">
        <ul>
          <li>
            <Link to="/currency-pro/">Sign In</Link>
          </li>
          <li>
            <Link to="/currency-pro/">Learn More</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/currency-pro/" element={<StartPage />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
