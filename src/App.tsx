import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { CountdownBanner } from './components/CountdownBanner';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Schedule } from './components/Schedule';
import { RegistrationForm } from './components/RegistrationForm';
import { StreamPage } from './pages/StreamPage';
import { AboutFounder } from './components/AboutFounder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <CountdownBanner />
        <Header />
        <Routes>
          {/* Define routes for pages */}
          <Route path="/" element={<MainPage />} />
          <Route path="https://www.workenligne.com/stream" element={<StreamPage />} />
        </Routes>
        <footer className="bg-dark text-accent/60 py-8 border-t border-accent/20">
          <div className="max-w-7xl mx-auto px-6 text-center font-mono text-sm">
            <p>Questions ? Contactez-nous : support@workenligne.com</p>
            <p>&copy; {new Date().getFullYear()} WorkEnLigne. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
  
}

function MainPage() {
  return (
    <main>
      <Hero />
      <Features />
      <AboutFounder />
      <RegistrationForm />
    </main>
  );
}

export default App;
