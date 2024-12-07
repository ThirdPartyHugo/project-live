import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getNextStreamDate, formatDate, formatTime } from '../utils/date';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [nextStreamDate, setNextStreamDate] = useState<string>('');
  const [nextStreamTime, setNextStreamTime] = useState<string>('');

  useEffect(() => {
    const nextStream = getNextStreamDate();

    // Set formatted date and time
    setNextStreamDate(formatDate(nextStream));
    setNextStreamTime(formatTime(nextStream));

    const calculateTimeLeft = () => {
      const difference = nextStream.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-dark text-accent py-3 sticky top-0 z-50 border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="font-mono">
              Session spéciale: {nextStreamDate} à {nextStreamTime}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-accent/80 font-mono">Temps restant:</span>
              <div className="flex items-center gap-1 font-mono text-lg">
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30">
                  {padNumber(timeLeft.hours)}
                </span>
                <span className="text-purple">:</span>
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30">
                  {padNumber(timeLeft.minutes)}
                </span>
                <span className="text-purple">:</span>
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30">
                  {padNumber(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
