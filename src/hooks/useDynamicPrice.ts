import { useState, useEffect } from 'react';

interface PriceData {
  currentPrice: number;
  registeredUsers: number;
  basePrice: number;
  priceIncrement: number;
  currency: string;
}

const DEFAULT_PRICE_DATA: PriceData = {
  currentPrice: 10.00,
  registeredUsers: 0,
  basePrice: 10.00,
  priceIncrement: 1.00,
  currency: 'CAD'
};

export const useDynamicPrice = () => {
  const [priceData, setPriceData] = useState<PriceData>(DEFAULT_PRICE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/current-price', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPriceData({
          currentPrice: Number(data.currentPrice) || DEFAULT_PRICE_DATA.currentPrice,
          registeredUsers: Number(data.registeredUsers) || DEFAULT_PRICE_DATA.registeredUsers,
          basePrice: Number(data.basePrice) || DEFAULT_PRICE_DATA.basePrice,
          priceIncrement: Number(data.priceIncrement) || DEFAULT_PRICE_DATA.priceIncrement,
          currency: data.currency || DEFAULT_PRICE_DATA.currency
        });
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch price data');
        }
        setPriceData(DEFAULT_PRICE_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return {
    ...priceData,
    isLoading,
    error
  };
};