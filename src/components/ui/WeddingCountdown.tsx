"use client";

// 1. Imported 'useCallback' instead of the unused 'useMemo'
import React, { useState, useEffect, useCallback } from "react";
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

// 2. Defined a props interface for the component
interface WeddingCountdownProps {
  weddingDate: Date;
}

// 3. Used the interface and destructured the 'weddingDate' prop correctly
const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ weddingDate }) => {
  // 4. Wrapped 'calculateTimeLeft' in 'useCallback'
  // This memoizes the function, ensuring it only changes if 'weddingDate' changes.
  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const now = new Date().getTime();
    const difference = weddingDate.getTime() - now;
    if (difference <= 0) return null;

    return {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  }, [weddingDate]); // Dependency is 'weddingDate'

  // 5. Used lazy initialization for 'useState'
  // This ensures 'calculateTimeLeft' is only called on the initial render.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft()
  );

  useEffect(() => {
    // Set the time immediately in case the prop changed
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]); // 6. Added 'calculateTimeLeft' to the dependency array

  if (!timeLeft) {
    return (
      <motion.div
        className="w-full py-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="font-extrabold text-3xl md:text-5xl text-primary drop-shadow-sm">
          💍 É hoje!
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
