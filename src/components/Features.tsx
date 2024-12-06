import React from 'react';
import { Monitor, Video, MessageSquare, Users, Laptop, Lock } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Monitor className="h-6 w-6" />,
      title: 'Diffusion Professionnelle',
      description: 'Transmissions haute qualité via notre infrastructure dédiée'
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Plateforme Personnalisée',
      description: 'Expérience de visionnement optimale via notre plateforme dédiée'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Interaction en Direct',
      description: 'Questions et discussions en temps réel pendant les sessions'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Accès Communautaire',
      description: 'Rejoignez une communauté de professionnels et apprenez ensemble'
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: 'Projets Réels',
      description: 'Apprenez à partir de véritables cas clients'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Plateforme Sécurisée',
      description: 'Environnement protégé pour les membres inscrits'
    }
  ];

  return (
    <section id="features" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-accent">Pourquoi Rejoindre Nos Sessions?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-dark/50 rounded-lg p-6 border border-accent/20 hover:border-accent/40 transition-colors">
              <div className="text-purple mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-accent">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}