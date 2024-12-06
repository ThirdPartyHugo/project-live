import React from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';

interface NDAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function NDAModal({ isOpen, onClose, onAccept }: NDAModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple" />
              <h2 className="text-xl font-bold">Accord de Confidentialité</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
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
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Refuser
          </button>
          <button
            onClick={onAccept}
            className="w-full sm:w-auto px-6 py-2 bg-purple text-white rounded-lg hover:bg-purple/90 flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Accepter et Continuer
          </button>
        </div>
      </div>
    </div>
  );
}