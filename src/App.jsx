import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

import ConvertResults from "./ConvertResults";
import StartPage from "./StartPage";
import Logo from "./Logo";

function Header() {
  return (
    <header>
      <Link to="/" className="logo-link">
        <Logo />
        Currencypro
      </Link>
      <nav>
        <ul className="main-nav">
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
      <Header />
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
