"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./globals.css";
import "./page.css";
import Snowfall from "react-snowfall";
// import ButterflyAnimation from "./components/ButterflyAnimation";
import Butterflies from "./components/Butterflies";

type Butterfly = {
  id: number;
  pathX: number[];
  pathY: number[];
  delay: number;
  duration: number;
};

export default function Page() {
  const [affirmation, setAffirmation] = useState<string>(
    "Loading affirmation… 🌷"
  );
  // const [theme, setTheme] = useState<string>("pastel");
  
  const [loading, setLoading] = useState<boolean>(false);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const createButterflies = (): Butterfly[] => {
    return Array.from({ length: 1 }).map(() => {
    const drift = Math.random() * 120 - 60;
    
    
    return {
    id: Date.now() + Math.random(),
    pathX: [0, drift / 2, drift],
    pathY: [0, -80 - Math.random() * 40, -200 - Math.random() * 1000],
    delay: Math.random() * 0.4,
    duration: 2.8 + Math.random(),
    };
    });
    };
    
    
    const removeButterfly = (id: number) => {
    setButterflies((prev) => prev.filter((b) => b.id !== id));
    };
    
    
    const handleNewAffirmation = async () => {
    if (loading) return;
    
    
    setButterflies((prev) => [...prev, ...createButterflies()]);
    await fetchAffirmation();
    };

    useEffect(() => {
      fetchAffirmation();
      }, []);
  

  const fetchAffirmation = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/affirmation");
      const data: { affirmation: string } = await response.json();
      setAffirmation(data.affirmation);
    } catch {
      setAffirmation("Take a deep breath. Try again 🤍");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAffirmation();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="main-container"
    >
      <Snowfall 
      color="#F8C0C8"
      snowflakeCount={isMobile ? 200 : 400}/>
      <Butterflies butterflies={butterflies} onRemove={removeButterfly} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
      >
        <motion.p
          key={affirmation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="affirmation"
        >
          {affirmation}
        </motion.p>

        <button
          onClick={handleNewAffirmation}
          disabled={loading}
          className="button"
        >
          {loading ? "Fetching…" : "New affirmation"}
        </button>
      </motion.div>
    </div>
  );
}