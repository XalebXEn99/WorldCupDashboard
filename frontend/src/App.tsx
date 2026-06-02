import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NextMatch from "./components/NextMatch";
import LiveScore from "./components/LiveScore";
import GroupStage from "./components/GroupStage";
import Knockouts from "./components/Knockouts";
import Leaderboard from "./components/Leaderboard";
import MatchHistory from "./components/MatchHistory";
import PrizePage from "./components/PrizePage";
import "./styles/styles.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app-container">
      <Header theme={theme} setTheme={setTheme} />
      <NextMatch />
      <LiveScore />
      <GroupStage />
      <Knockouts />
      <Leaderboard />
      <MatchHistory />
      <PrizePage />
    </div>
  );
};

export default App;
