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
    Cet Accord de Non-Divulgation ("Accord") est conclu entre WorkEnLigne ("Partie Divulgatrice")
    et le Participant soussigné ("Partie Réceptrice") concernant l'accès aux sessions exclusives 
    organisées par WorkEnLigne. En acceptant cet Accord, le Participant reconnaît l'importance 
    de protéger les informations confidentielles et stratégiques partagées lors des sessions.
  </p>
  
  <h4 className="font-semibold mt-4">1. Objet de l'Accord</h4>
  <p className="text-gray-600">
    L'Accord vise à protéger les informations confidentielles partagées lors des sessions en direct,
    notamment des données stratégiques, des méthodologies propriétaires, et des projets clients,
    afin de garantir leur non-divulgation et leur utilisation appropriée.
  </p>
  
  <h4 className="font-semibold mt-4">2. Définitions des Informations Confidentielles</h4>
  <p className="text-gray-600">
    Les Informations Confidentielles incluent, mais ne se limitent pas à :
  </p>
  <ul className="text-gray-600">
    <li>Données clients : campagnes, performances, et stratégies publicitaires.</li>
    <li>Méthodologies propriétaires : outils, scripts, modèles, et workflows.</li>
    <li>Secrets commerciaux : listes de clients, pratiques tarifaires, et documents stratégiques.</li>
    <li>Contenu des sessions : vidéos, discussions, supports, et tout matériel partagé.</li>
    <li>Tout autre élément identifié comme "confidentiel" par WorkEnLigne.</li>
  </ul>
  
  <h4 className="font-semibold mt-4">3. Obligations du Participant</h4>
  <p className="text-gray-600">
    Le Participant s'engage à :
  </p>
  <ul className="text-gray-600">
    <li>Ne pas divulguer les Informations Confidentielles à des tiers sans autorisation écrite préalable.</li>
    <li>Ne pas utiliser les Informations Confidentielles à des fins autres que l'apprentissage personnel.</li>
    <li>Ne pas enregistrer, capturer ou reproduire tout contenu des sessions sous quelque forme que ce soit.</li>
    <li>Protéger les Informations Confidentielles contre tout accès non autorisé.</li>
    <li>Ne pas utiliser les Informations Confidentielles pour développer ou promouvoir des produits ou services concurrents pendant une période de 5 ans.</li>
  </ul>
  
  <h4 className="font-semibold mt-4">4. Durée et Validité</h4>
  <p className="text-gray-600">
    Cet Accord prend effet à compter de la date de signature et reste valide indéfiniment, sauf résiliation
    écrite par WorkEnLigne.
  </p>
  
  <h4 className="font-semibold mt-4">5. Sanctions</h4>
  <p className="text-gray-600">
    En cas de violation de cet Accord, WorkEnLigne se réserve le droit de :
  </p>
  <ul className="text-gray-600">
    <li>Exclure immédiatement le Participant des sessions actuelles et futures sans remboursement.</li>
    <li>Engager des poursuites judiciaires pour demander des dommages-intérêts et couvrir les pertes subies.</li>
    <li>Imposer une pénalité de 50,000 CAD pour chaque violation constatée.</li>
  </ul>
  
  <h4 className="font-semibold mt-4">6. Exceptions à la Confidentialité</h4>
  <p className="text-gray-600">
    Les obligations de confidentialité ne s'appliquent pas aux informations :
  </p>
  <ul className="text-gray-600">
    <li>Déjà connues du public avant leur divulgation.</li>
    <li>Devenues publiques sans faute de la Partie Réceptrice.</li>
    <li>Développées indépendamment par la Partie Réceptrice sans utiliser les Informations Confidentielles.</li>
    <li>Révélées en vertu d'une exigence légale ou judiciaire, à condition que WorkEnLigne soit informée à l'avance.</li>
  </ul>
  
  <h4 className="font-semibold mt-4">7. Juridiction</h4>
  <p className="text-gray-600">
    Cet Accord est régi par les lois du Canada, et tout litige sera soumis à la juridiction exclusive des tribunaux
    de Montréal, Québec.
  </p>
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
                  disabled={!signature}
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