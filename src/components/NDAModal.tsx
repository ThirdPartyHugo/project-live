import React, { useState } from 'react';
import { X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { SignatureInput } from './legal/SignatureInput';

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function NDAModal({ isOpen, onClose, onAccept }: NDAModalProps) {
  const [signature, setSignature] = useState('');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(
      element.scrollHeight - element.scrollTop - element.clientHeight
    ) < 50;
    
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (!signature) {
      alert('Veuillez signer le document avant de continuer.');
      return;
    }
    onAccept();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl flex flex-col max-h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple" />
            <h2 className="text-xl font-bold">Accord de Confidentialité</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto p-6"
          onScroll={handleScroll}
          style={{ minHeight: '250px' }}
        >
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">ACCORD DE CONFIDENTIALITÉ</h3>
            <p className="text-gray-600">
              Cet accord de non-divulgation (l'"Accord") est conclu entre WorkEnLigne ("Société") 
              et le participant soussigné ("Participant") concernant l'accès aux sessions de diffusion en direct 
              présentant le travail client et les flux de travail professionnels.
            </p>
            
            <h4 className="font-semibold mt-4">1. Informations Confidentielles</h4>
            <p className="text-gray-600">
              Toutes les informations partagées pendant les sessions en direct, y compris mais sans s'y limiter, 
              les projets clients, les flux de travail, les méthodologies et les pratiques commerciales, 
              seront considérées comme des Informations Confidentielles.
            </p>
            
            <h4 className="font-semibold mt-4">2. Non-Divulgation</h4>
            <p className="text-gray-600">
              Le Participant s'engage à ne pas partager, distribuer ou divulguer de quelque manière que ce soit 
              les Informations Confidentielles obtenues lors des sessions à des tiers sans l'autorisation écrite 
              explicite de la Société.
            </p>
            
            <h4 className="font-semibold mt-4">3. Interdiction d'Enregistrement</h4>
            <p className="text-gray-600">
              Le Participant s'engage à ne pas enregistrer, capturer ou reproduire toute partie des sessions 
              de diffusion en direct sous quelque forme ou support que ce soit.
            </p>
            
            <h4 className="font-semibold mt-4">4. Durée</h4>
            <p className="text-gray-600">
              Cet Accord restera en vigueur indéfiniment à partir de la date d'acceptation.
            </p>

            <h4 className="font-semibold mt-4">5. Sanctions</h4>
            <p className="text-gray-600">
              Toute violation de cet accord pourra entraîner des poursuites judiciaires et le paiement 
              de dommages et intérêts, ainsi que l'exclusion immédiate des sessions.
            </p>

            <h4 className="font-semibold mt-4">6. Juridiction</h4>
            <p className="text-gray-600">
              Le présent accord est régi par les lois en vigueur au Canada. Tout litige sera soumis 
              à la juridiction exclusive des tribunaux compétents de Montréal.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t shrink-0">
          {hasScrolledToBottom ? (
            <div className="p-6 bg-gray-50 space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Signature Électronique</h4>
                <SignatureInput onSignatureComplete={setSignature} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!signature}
                  className="w-full sm:w-auto px-6 py-2 bg-purple text-white rounded-lg hover:bg-purple/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="h-5 w-5" />
                  Signer et Accepter
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 flex items-center gap-2 text-gray-600">
              <AlertCircle className="h-5 w-5" />
              <span>Veuillez lire l'intégralité du document pour continuer</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}