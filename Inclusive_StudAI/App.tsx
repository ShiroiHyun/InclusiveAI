import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import OcrTool from './components/OcrTool';
import VoiceDictation from './components/VoiceDictation';
import AdminPanel from './components/AdminPanel';
import AccessibilityPanel from './components/AccessibilityPanel';
import Schedule from './components/Schedule';
import Settings from './components/Settings';
import { AppController } from './controllers/appController';
import { User } from './types';
import { 
  EyeIcon, 
  SpeakerWaveIcon, 
  Squares2X2Icon,
  BookOpenIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type ViewMode = 'login' | 'dashboard' | 'ocr' | 'stt' | 'schedule' | 'settings' | 'admin';

const App: React.FC = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const [showHelp, setShowHelp] = useState(false);
  
  // Login Form State
  const [email, setEmail] = useState('juan@estudiante.edu');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Apply Font Size Class Helper
  const getFontSizeClass = () => {
    if (!user) return 'text-base';
    if (user.preferences.fontSize === 'large') return 'text-lg';
    if (user.preferences.fontSize === 'xl') return 'text-xl';
    return 'text-base';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const loggedUser = await AppController.login(email, password);
      if (loggedUser) {
        setUser(loggedUser);
        setCurrentView(loggedUser.role === 'admin' ? 'admin' : 'dashboard');
        // Initial contrast check
        if (loggedUser.preferences.highContrast) {
           document.documentElement.classList.add('grayscale', 'contrast-125');
        } else {
           document.documentElement.classList.remove('grayscale', 'contrast-125');
        }
      } else {
        setLoginError('Credenciales inválidas. Intente: juan@estudiante.edu');
      }
    } catch (err) {
      setLoginError('Error de conexión.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    document.documentElement.classList.remove('grayscale', 'contrast-125');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">IS</div>
                <h1 className="text-2xl font-bold text-slate-900">Inclusive StudAI</h1>
                <p className="text-slate-500 mt-2">Plataforma de Inclusión Académica</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Correo Institucional</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                
                {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
                
                <button 
                  type="submit" 
                  disabled={loginLoading}
                  className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  {loginLoading ? 'Ingresando...' : 'Iniciar Sesión (SSO)'}
                </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
                 Acceso seguro para estudiantes y personal administrativo.
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8 animate-fadeIn">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Hola, {user?.name.split(' ')[0]}</h2>
                <p className="text-slate-500 mt-1">Tu espacio de trabajo accesible.</p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-indigo-600">Semana 8, Ciclo 2025-I</p>
              </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <button 
                onClick={() => setCurrentView('ocr')}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <EyeIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Lector Inteligente</h3>
                <p className="text-sm text-slate-500 mt-2">OCR para documentos y lectura TTS</p>
              </button>

              <button 
                onClick={() => setCurrentView('stt')}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-pink-500 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <SpeakerWaveIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Subtitulado en Vivo</h3>
                <p className="text-sm text-slate-500 mt-2">Transcripción de clases en tiempo real</p>
              </button>

              {/* Schedule Preview (RF-F6) */}
              <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" /> Próxima Clase
                  </h3>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="font-bold text-lg">Ingeniería de Sistemas</p>
                    <p className="text-indigo-200 text-sm">Aula 302 • 10:00 AM</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentView('schedule')}
                  className="mt-4 w-full bg-white text-indigo-900 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50"
                >
                  Ver Agenda Completa
                </button>
              </div>
            </div>
          </div>
        );

      case 'ocr':
        return (
           <div className="space-y-4 animate-fadeIn">
              <button onClick={() => setCurrentView('dashboard')} className="text-indigo-600 font-medium hover:underline mb-2">← Volver al Panel</button>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Lector Inteligente (OCR+TTS)</h2>
              <OcrTool />
           </div>
        );

      case 'stt':
        return (
            <div className="space-y-4 animate-fadeIn">
                <button onClick={() => setCurrentView('dashboard')} className="text-indigo-600 font-medium hover:underline mb-2">← Volver al Panel</button>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Subtitulado Automático</h2>
                <VoiceDictation />
            </div>
        );
      
      case 'schedule':
        return user ? (
          <Schedule 
            appointments={AppController.getAppointments(user.id)} 
            // We force re-render when user updates by using key or state, but here simple prop passing
            // In a real app we would use useEffect to fetch data.
          />
        ) : null;
      
      case 'settings':
        return user ? <Settings user={user} onUpdate={setUser} /> : null;

      case 'admin':
        return <AdminPanel metrics={AppController.getAdminDashboardData().metrics} />;
        
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  // If in login mode without user, show basic layout
  if (currentView === 'login') return renderContent();

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans ${getFontSizeClass()}`}>
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-24 lg:w-72 bg-white border-r border-slate-200 flex-shrink-0 sticky top-0 md:h-screen z-40 flex md:flex-col justify-between transition-all duration-300">
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">IS</div>
            <div className="hidden lg:block">
              <span className="font-bold text-slate-800 block leading-tight">StudAI</span>
              <span className="text-xs text-slate-500">Suite de Inclusión</span>
            </div>
          </div>
          
          <ul className="flex md:flex-col gap-2 p-4 overflow-x-auto md:overflow-visible">
            <li>
              <button 
                onClick={() => setCurrentView(user?.role === 'admin' ? 'admin' : 'dashboard')}
                className={`nav-btn ${['dashboard', 'admin'].includes(currentView) ? 'active' : ''}`}
              >
                <Squares2X2Icon className="w-6 h-6" />
                <span className="nav-label">Panel Principal</span>
              </button>
            </li>
            
            {user?.role === 'student' && (
              <>
                <li>
                  <button onClick={() => setCurrentView('ocr')} className={`nav-btn ${currentView === 'ocr' ? 'active' : ''}`}>
                    <BookOpenIcon className="w-6 h-6" />
                    <span className="nav-label">Materiales (OCR)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('stt')} className={`nav-btn ${currentView === 'stt' ? 'active' : ''}`}>
                    <SpeakerWaveIcon className="w-6 h-6" />
                    <span className="nav-label">Subtítulos (STT)</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('schedule')} className={`nav-btn ${currentView === 'schedule' ? 'active' : ''}`}>
                    <CalendarIcon className="w-6 h-6" />
                    <span className="nav-label">Citas</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('settings')} className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}>
                    <Cog6ToothIcon className="w-6 h-6" />
                    <span className="nav-label">Configuración</span>
                  </button>
                </li>
              </>
            )}
            
            {/* Help Button (RF-F17) */}
             <li>
              <button onClick={() => setShowHelp(true)} className="nav-btn text-indigo-500 hover:text-indigo-700">
                <QuestionMarkCircleIcon className="w-6 h-6" />
                <span className="nav-label">Ayuda y Tutorial</span>
              </button>
            </li>
          </ul>
        </div>
        
        <div className="hidden md:block p-4 border-t border-slate-100">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 p-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
           >
             <ArrowRightOnRectangleIcon className="w-6 h-6" />
             <span className="hidden lg:inline font-medium text-sm">Cerrar Sesión</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto h-screen scroll-smooth" ref={contentRef}>
        {/* Top Mobile Bar */}
        <div className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center sticky top-0 z-30">
           <span className="font-bold text-slate-800">StudAI</span>
           <div className="flex gap-2">
            <button onClick={() => setShowHelp(true)} className="text-indigo-600 p-2"><QuestionMarkCircleIcon className="w-6 h-6" /></button>
            <button onClick={handleLogout} className="text-red-600 p-2"><ArrowRightOnRectangleIcon className="w-6 h-6" /></button>
           </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 md:p-12 pb-32">
          {renderContent()}
        </div>
      </main>

      {/* Persistent Accessibility Tools */}
      <AccessibilityPanel contentRef={contentRef} voiceSpeed={user?.preferences.voiceSpeed} />
      <Chatbot />
      
      {/* Help Modal (RF-F17) */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <QuestionMarkCircleIcon className="w-6 h-6" /> Tutorial de Uso
                    </h3>
                    <button onClick={() => setShowHelp(false)} className="hover:bg-indigo-500 rounded p-1"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700">
                    <div>
                        <h4 className="font-bold text-indigo-600 mb-1">1. Lector Inteligente</h4>
                        <p className="text-sm">Sube fotos de documentos para convertirlos a texto. Usa el botón "Escuchar" para que el sistema lea el contenido.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-600 mb-1">2. Subtitulado</h4>
                        <p className="text-sm">En clase, activa esta herramienta para ver transcripciones en tiempo real con letra grande y alto contraste.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-600 mb-1">3. Comandos de Voz</h4>
                        <p className="text-sm">Puedes usar el chat en la esquina inferior para pedir ayuda o dictar notas.</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-indigo-600 mb-1">4. Accesibilidad</h4>
                        <p className="text-sm">Usa los botones flotantes (derecha abajo) para leer la pantalla actual o cambiar a modo alto contraste.</p>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100 text-center">
                    <button onClick={() => setShowHelp(false)} className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-lg font-bold hover:bg-indigo-200">Entendido</button>
                </div>
            </div>
        </div>
      )}

      {/* CSS Helper for Nav Buttons */}
      <style>{`
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          width: 100%;
          transition: all 0.2s;
          color: #64748b;
        }
        .nav-btn:hover {
          background-color: #f1f5f9;
          color: #334155;
        }
        .nav-btn.active {
          background-color: #e0e7ff;
          color: #4338ca;
        }
        .nav-label {
          font-size: 0.875rem;
          font-weight: 500;
          display: none;
        }
        @media (min-width: 1024px) {
          .nav-label { display: block; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;