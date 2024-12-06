import React from 'react';
import { TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useDynamicPrice } from '../hooks/useDynamicPrice';

export function PriceDisplay() {
  const { currentPrice, registeredUsers, basePrice, priceIncrement, currency, isLoading, error } = useDynamicPrice();

  return (
    <div className="bg-purple/10 rounded-lg p-6 mb-6 border border-purple/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <span className="font-mono font-semibold text-accent">Prix Dynamique</span>
        </div>
        <div className="flex items-center gap-2 text-accent">
          <Users className="h-5 w-5" />
          <span className="text-sm font-mono">
            {isLoading ? 'Chargement...' : `${registeredUsers} inscrits`}
          </span>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-mono">Prix par défaut utilisé</span>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono text-accent">
            ${currentPrice.toFixed(2)}
          </span>
          <span className="text-sm text-accent/80 font-mono">{currency}</span>
        </div>
        <div className="text-sm text-accent/80 font-mono">
          <p>Base: ${basePrice.toFixed(2)} {currency}</p>
          <p>+${priceIncrement.toFixed(2)} {currency} par inscription</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-accent font-mono">
        <p className="font-medium">🔒 Le prix augmente à chaque nouvelle inscription</p>
        <p>Sécurisez votre place au tarif actuel</p>
      </div>
    </div>
  );
}