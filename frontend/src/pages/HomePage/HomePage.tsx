import React from "react";
import { useMemo } from "react";
import getFumenFromReplay from "../../scripts/upload";
import Setup from "../../components/Setup/Setup";
import Sidebar from "../../components/Sidebar/Sidebar";

const sets = [
  {
    title: "Algebruh's 2nd",
    pfp : "https://cdn.discordapp.com/avatars/554411603609518095/161d78efc00421e3a4e62425221f5311.webp?size=40",
    author: "algebruh",
    methods: "29/35",
    setups: 40,
    cover: "100%",
    description: "This set is organized to minimize difficulty while maintaining reliability and usefulness."
  },
  {
    title: "2nd 100% T",
    pfp: "https://cdn.discordapp.com/avatars/402657980517974026/1f90c2454cdd8f7ad0111a83e66fc55a.webp?size=48",
    author: "mkjl",
    methods: "21/35",
    setups: 882,
    cover: "0.11%",
    description: "This set contains every 2nd PC that has a 100% chance of saving into T 3rd."
  }
];

const HomePage: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
    </div>
  );
};

export default HomePage;
