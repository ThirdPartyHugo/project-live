import React, { useState } from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';
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
    if (!hasScrolledToBottom) {
      alert('Veuillez lire le document jusqu’à la fin avant de continuer.');
      return;
    }
    onAccept();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl w-full max-w-2xl flex flex-col max-h-[calc(100vh-2rem)]"
        style={{ height: '100%', maxHeight: 'calc(100vh - 2rem)' }}
      >
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
          style={{
            minHeight: '200px',
            maxHeight: 'calc(100vh - 240px)', // Ensure content fits below header and footer
          }}
        >
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">ACCORD DE CONFIDENTIALITÉ</h3>
            <p className="text-gray-600">
              Cet Accord de Non-Divulgation ("Accord") est conclu entre WorkEnLigne
              ("Partie Divulgatrice") et le Participant soussigné ("Partie Réceptrice")
              concernant l'accès aux sessions exclusives organisées par WorkEnLigne...
            </p>
            {/* Include other NDA content as before */}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t shrink-0">
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
                disabled={!signature || !hasScrolledToBottom}
                className="w-full sm:w-auto px-6 py-2 bg-purple text-white rounded-lg hover:bg-purple/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="h-5 w-5" />
                Signer et Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
