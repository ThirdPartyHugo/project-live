import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getNextStreamDate, formatDate, formatTime } from '../utils/date';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
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
              Prochaine Session: {nextStreamDate} à {nextStreamTime}am
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-accent/80 font-mono">Temps restant:</span>
              <div className="flex items-center gap-1 font-mono text-lg">
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30 text-red-500">
                  {timeLeft.days}j
                </span>
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30 text-red-500">
                  {padNumber(timeLeft.hours)}h
                </span>
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30 text-red-500">
                  {padNumber(timeLeft.minutes)}m
                </span>
                <span className="bg-purple/20 px-2 py-1 rounded border border-purple/30 text-red-500">
                  {padNumber(timeLeft.seconds)}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
