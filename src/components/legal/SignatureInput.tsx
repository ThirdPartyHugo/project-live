import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface SignatureInputProps {
  onSignatureComplete: (signature: string) => void;
}

export function SignatureInput({ onSignatureComplete }: SignatureInputProps) {
  const [name, setName] = useState('');
  const [date] = useState(new Date().toLocaleDateString('fr-CA'));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      onSignatureComplete(`${value} - ${date}`);
    } else {
      onSignatureComplete('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="signature-name" className="block text-sm font-medium text-gray-700">
          Votre nom complet
        </label>
        <div className="relative">
          <input
            id="signature-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Ex: Jean Dupont"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-lg"
          />
          {name.trim() && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Date de signature
        </label>
        <input
          type="text"
          value={date}
          disabled
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
        />
      </div>

      <p className="text-sm text-gray-500 italic">
        En tapant votre nom ci-dessus, vous acceptez que cette signature électronique 
        soit légalement équivalente à votre signature manuscrite.
      </p>
    </div>
  );
}