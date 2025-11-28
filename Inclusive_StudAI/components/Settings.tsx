import React, { useState } from 'react';
import { User } from '../types';
import { AppController } from '../controllers/appController';
import { UserCircleIcon, SpeakerWaveIcon, EyeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [prefs, setPrefs] = useState(user.preferences);
  const [consents, setConsents] = useState(user.consents);

  const handleToggleContrast = () => {
    const newUser = AppController.toggleHighContrast(user.id, prefs.highContrast);
    if (newUser) {
      setPrefs(newUser.preferences);
      onUpdate(newUser);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value as 'normal' | 'large' | 'xl';
    const newUser = AppController.updatePreferences(user.id, { fontSize: newVal });
    if (newUser) {
        setPrefs(newUser.preferences);
        onUpdate(newUser);
    }
  };

  const handleVoiceSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    const newUser = AppController.updatePreferences(user.id, { voiceSpeed: newVal });
    if (newUser) {
        setPrefs(newUser.preferences);
        onUpdate(newUser);
    }
  };

  const handleConsentChange = (key: keyof User['consents']) => {
    const newConsents = { ...consents, [key]: !consents[key] };
    const newUser = AppController.updateConsents(user.id, newConsents);
    if (newUser) {
        setConsents(newUser.consents);
        onUpdate(newUser);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <h2 className="text-2xl font-bold text-slate-900">Configuración de Perfil</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-10 h-10" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">{user.name}</h3>
              <p className="text-slate-500">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded uppercase font-bold">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Accessibility Preferences */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <EyeIcon className="w-5 h-5" /> Accesibilidad Visual
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="font-medium text-slate-700">Modo Alto Contraste</span>
              <button 
                onClick={handleToggleContrast}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${prefs.highContrast ? 'bg-indigo-600' : 'bg-slate-300'}`}
                aria-label={prefs.highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${prefs.highContrast ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="font-medium text-slate-700">Tamaño de Fuente</span>
              <select 
                value={prefs.fontSize}
                onChange={handleFontSizeChange}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="xl">Extra Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio Preferences */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <SpeakerWaveIcon className="w-5 h-5" /> Preferencias de Voz (TTS)
          </h3>
          
          <div className="space-y-4">
             <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between">
                    <span className="font-medium text-slate-700">Velocidad de Lectura</span>
                    <span className="text-slate-500 text-sm">{prefs.voiceSpeed}x</span>
                </div>
                <input 
                    type="range" 
                    min="0.5" 
                    max="2" 
                    step="0.1" 
                    value={prefs.voiceSpeed}
                    onChange={handleVoiceSpeedChange}
                    className="w-full accent-indigo-600" 
                />
             </div>
          </div>
        </div>

        {/* Privacy & Security (RF-F19) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" /> Privacidad y Consentimiento
          </h3>
          
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex flex-col">
                    <span className="font-medium text-slate-700">Recolección de Datos de Uso</span>
                    <span className="text-xs text-slate-500">Para mejorar la experiencia (Anónimo)</span>
                </div>
                <input 
                    type="checkbox" 
                    checked={consents.dataCollection} 
                    onChange={() => handleConsentChange('dataCollection')}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" 
                />
             </div>
             
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex flex-col">
                    <span className="font-medium text-slate-700">Grabación de Voz para Mejora</span>
                    <span className="text-xs text-slate-500">Permitir análisis de comandos de voz</span>
                </div>
                <input 
                    type="checkbox" 
                    checked={consents.voiceRecording} 
                    onChange={() => handleConsentChange('voiceRecording')}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" 
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;