import React from "react";
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
  return (
    <div className="app-container">
      <Header />
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
