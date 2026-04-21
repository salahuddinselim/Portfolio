"use client";

import { useState } from "react";
import Terminal from "../components/terminal/Terminal";
import Website from "../components/website/Website";
import Navbar from "../components/website/Navbar";
import Hero from "../components/website/Hero";
import About from "../components/website/About";
import Skills from "../components/website/Skills";
import Projects from "../components/website/Projects";
import Contact from "../components/website/Contact";

export default function Home() {
  const [mode, setMode] = useState<"terminal" | "website">("terminal");

  if (mode === "terminal") {
    return <Terminal onSwitchToGui={() => setMode("website")} />;
  }

  return <Website onSwitchToTerminal={() => setMode("terminal")} />;
}