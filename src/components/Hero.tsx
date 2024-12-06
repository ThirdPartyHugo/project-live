import React from 'react';
import { Lock, Users, Shield } from 'lucide-react';
import { PriceDisplay } from './PriceDisplay';

export function Hero() {
  return (
    <section className="relative bg-dark text-white py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple/20 text-accent px-4 py-2 rounded-full border border-purple/30 mb-6">
              <Lock className="h-4 w-4" />
              <span className="font-mono text-sm">Accès Exclusif aux Membres</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
              Sessions Exclusives de Marketing Digital
            </h1>
            <p className="text-lg mb-8 text-gray-400 font-mono">
              Rejoignez un cercle exclusif de professionnels qui comprennent la valeur de l'expertise concrète. Places limitées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#register" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-dark font-mono font-semibold hover:bg-accent/90 transition-colors"
              >
                Réserver Ma Place
              </a>
              <a 
                href="#schedule" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-accent/30 text-accent font-mono hover:bg-accent/10 transition-colors"
              >
                Voir l'Horaire
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-dark/80 backdrop-blur-sm rounded-lg p-8 border border-accent/20">
              <PriceDisplay />
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 mt-1 text-purple" />
                  <div>
                    <h3 className="font-mono font-semibold mb-2 text-accent">Protégé par NDA</h3>
                    <p className="text-gray-400 font-mono text-sm">Sessions strictement confidentielles avec cas clients réels</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 mt-1 text-purple" />
                  <div>
                    <h3 className="font-mono font-semibold mb-2 text-accent">Accès Limité</h3>
                    <p className="text-gray-400 font-mono text-sm">Réservé aux professionnels sérieux</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}