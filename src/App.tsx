import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Header } from './components/Header';
import { CountdownBanner } from './components/CountdownBanner';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Schedule } from './components/Schedule';
import { RegistrationForm } from './components/RegistrationForm';
import { StreamPage } from '../pages/StreamPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark">
        <CountdownBanner />
        <Header />
        <Routes>
          {/* Define routes for pages */}
          <Route path="/" element={<MainPage />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/api/create-checkout-session" element={<ApiHandler route="create-checkout-session" />} />
          <Route path="/api/some-other-api" element={<ApiHandler route="some-other-api" />} />
        </Routes>
        <footer className="bg-dark text-accent/60 py-8 border-t border-accent/20">
          <div className="max-w-7xl mx-auto px-6 text-center font-mono text-sm">
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
      <Schedule />
      <RegistrationForm />
    </main>
  );
}

function ApiHandler({ route }: { route: string }) {
  // Simulate API call
  React.useEffect(() => {
    fetch(`/api/${route}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Response from ${route}:`, data);
      })
      .catch((error) => {
        console.error(`Error fetching ${route}:`, error);
      });
  }, [route]);

  return (
    <div className="text-center mt-20">
      <h2>API: {route}</h2>
      <p>Check the console for API response.</p>
    </div>
  );
}

export default App;
