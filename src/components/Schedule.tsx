import React from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { getNextStreamDate } from '../utils/date';
import { useDynamicPrice } from '../hooks/useDynamicPrice';

export function Schedule() {
  const nextStream = getNextStreamDate();
  const { currentPrice, currency } = useDynamicPrice();
  
  return (
    <section id="schedule" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-accent">Horaire des Diffusions</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Session spéciale ce lundi 9 décembre. Les prochaines sessions seront réservées aux membres.
        </p>
        
        {/* Session Spéciale */}
        <div className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Lundi 9 décembre</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5" />
                <span>10h00 - 11h00</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Session d'Introduction Spéciale</h3>
              <p className="text-indigo-100">Découvrez nos sessions de travail professionnelles</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="h-5 w-5" />
                <span className="text-2xl font-bold">{currentPrice.toFixed(2)}</span>
                <span className="text-sm">{currency}</span>
              </div>
              <span className="text-sm text-indigo-100">Prix actuel</span>
            </div>
          </div>
        </div>

        {/* Horaire Régulier */}
        <div className="grid md:grid-cols-3 gap-8">
          {['Lundi', 'Mercredi', 'Vendredi'].map((day) => (
            <div key={day} className="bg-dark/50 rounded-lg p-6 border border-accent/20 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Chaque {day}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Clock className="h-5 w-5" />
                <span>10h00 - 11h00</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent">Atelier Professionnel</h3>
              <p className="text-gray-400 mb-4">Plongez dans des projets clients réels et des flux de travail professionnels</p>
              <div className="mt-auto">
                <span className="inline-block bg-purple/20 text-accent px-3 py-1 rounded-full text-sm font-medium border border-purple/30">
                  Membres Seulement
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}