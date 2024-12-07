import React from 'react';


export function Header() {
  return (
    <header className="w-full py-4 px-6 bg-dark border-b border-accent/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      <img style={{height:"auto", width:"100px"}}
          src="https://storage.googleapis.com/msgsndr/TGSQy13Dr8TSrXnuMyTd/media/6754cc8429695a8da3702275.png"
          alt="Logo WorkEnLigne" 
        />

        <nav>
          <ul className="flex items-center gap-6">
            <li><a href="#features" className="text-accent hover:text-accent/80">Avantages</a></li>
            <li><a href="#about" className="text-accent hover:text-accent/80">A propos</a></li>
            <li><a href="#register" className="text-accent hover:text-accent/80">S'inscrire</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}