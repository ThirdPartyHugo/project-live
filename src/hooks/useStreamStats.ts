import { useState, useEffect } from 'react';

interface StreamStats {
  viewerCount: number;
  messageCount: number;
}

export const useStreamStats = () => {
  const [stats, setStats] = useState<StreamStats>({
    viewerCount: 0,
    messageCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stream-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stream stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { stats, isLoading };
};