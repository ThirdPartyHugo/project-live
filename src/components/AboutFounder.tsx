import React from 'react';
import { TrendingUp, Users, DollarSign, Briefcase, GraduationCap, Building } from 'lucide-react';

export function AboutFounder() {
  const achievements = [
    {
      icon: <TrendingUp className="h-6 w-6 text-purple" />,
      title: "1.5M$ en Chiffre d'Affaires",
      description: "Générés depuis 2020"
    },
    {
      icon: <Users className="h-6 w-6 text-purple" />,
      title: "30+ Employés",
      description: "Dans toutes les sphères du SMMA"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple" />,
      title: "50M$+ en Revenus",
      description: "Générés pour nos clients"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple" />,
      title: "150+ Clients",
      description: "Servis dans toutes les niches"
    },
    {
      icon: <Building className="h-6 w-6 text-purple" />,
      title: "6 Ans d'Expérience",
      description: "En Digital Marketing et SMMA"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-purple" />,
      title: "Autodidacte",
      description: "Success sans diplôme traditionnel"
    }
  ];

  return (
    <section className="py-20 bg-dark border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-accent text-center">
              Qui est derrière WorkEnLigne?
            </h2>
            <div className="space-y-6">
              <div className="bg-dark/50 p-6 rounded-lg border border-accent/20">
                <p className="text-accent text-lg mb-4">
                  Je m'appelle Zack, j'ai 24 ans, je suis dans le Marketing depuis 2018
                </p>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src="https://storage.googleapis.com/msgsndr/TGSQy13Dr8TSrXnuMyTd/media/6754c43153bb95309da70791.jpeg"
                    alt="Zackary Perron"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-dark/50 p-6 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors"
              >
                <div className="mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  {achievement.title}
                </h3>
                <p className="text-gray-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}