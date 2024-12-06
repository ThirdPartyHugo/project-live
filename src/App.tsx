import React from 'react';
import { Header } from './components/Header';
import { CountdownBanner } from './components/CountdownBanner';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Schedule } from './components/Schedule';
import { RegistrationForm } from './components/RegistrationForm';
import { StreamPage } from '../pages/StreamPage';

function App() {
  const path = window.location.pathname;

  if (path === '/stream') {
    return <StreamPage />;
  }

  return (
    <div className="min-h-screen bg-dark">
      <CountdownBanner />
      <Header />
      <main>
        <Hero />
        <Features />
        <Schedule />
        <RegistrationForm />
      </main>
      <footer className="bg-dark text-accent/60 py-8 border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-6 text-center font-mono text-sm">
          <p>&copy; {new Date().getFullYear()} WorkEnLigne. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;