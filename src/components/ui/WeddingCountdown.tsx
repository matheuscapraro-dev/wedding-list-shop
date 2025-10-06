"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface TimeUnitProps {
  value: number;
  label: string;
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center min-w-[60px]"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[50px] tabular-nums">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs xl:text-base text-muted-foreground tracking-widest uppercase">
      {label}
    </span>
  </motion.div>
);

const WeddingCountdown: React.FC = () => {
  const weddingDate = useMemo(() => new Date("2025-12-21T15:00:00"), []);

  const calculateTimeLeft = (): TimeLeft | null => {
    const now = new Date().getTime();
    const difference = weddingDate.getTime() - now;
    if (difference <= 0) return null;

    return {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <motion.div
        className="w-full py-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="font-extrabold text-3xl md:text-5xl text-primary drop-shadow-sm">
          💍 É hoje o grande dia!
        </h3>
      </motion.div>
    );
  }

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
        <TimeUnit value={timeLeft.dias} label="Dias" />
        <TimeUnit value={timeLeft.horas} label="Horas" />
        <TimeUnit value={timeLeft.minutos} label="Minutos" />
        <TimeUnit value={timeLeft.segundos} label="Segundos" />
      </div>
    </div>
  );
};

export default WeddingCountdown;
