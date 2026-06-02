import React, { useState, useEffect } from "react";

interface HeaderProps {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1>World Cup 2026 Joseph Household Competition</h1>
          <p>Family football showdown, winner takes R600!</p>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
