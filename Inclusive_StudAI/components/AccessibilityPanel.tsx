import React, { useState, useEffect } from 'react';
import { SpeakerWaveIcon, PauseCircleIcon, EyeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface AccessibilityPanelProps {
  contentRef: React.RefObject<HTMLElement>;
  voiceSpeed?: number;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ contentRef, voiceSpeed = 1.0 }) => {
  const [speaking, setSpeaking] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('grayscale');
    document.documentElement.classList.toggle('contrast-125');
  };

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    if (!contentRef.current) return;

    const textToRead = contentRef.current.innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = voiceSpeed; // Apply user preference

    utterance.onend = () => setSpeaking(false);
    
    setSpeechSynthesisInstance(utterance);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={toggleHighContrast}
        className={`p-4 rounded-full shadow-lg transition-colors ${
          highContrast ? 'bg-yellow-400 text-black' : 'bg-white text-slate-700 hover:bg-slate-100'
        }`}
        aria-label="Alternar alto contraste"
        title="Alto Contraste"
      >
        {highContrast ? <SunIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
      </button>

      <button
        onClick={handleSpeak}
        className={`p-4 rounded-full shadow-lg transition-colors ${
          speaking ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        aria-label={speaking ? "Detener lectura" : "Leer contenido"}
        title={speaking ? "Detener" : "Leer Pantalla"}
      >
        {speaking ? <PauseCircleIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AccessibilityPanel;