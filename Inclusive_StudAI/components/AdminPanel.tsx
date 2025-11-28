import React from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  DocumentCheckIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { Metric } from '../types';

interface AdminPanelProps {
  metrics: Metric[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ metrics }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Panel Administrativo (Staff)</h2>
          <p className="text-slate-500">Gestión de inclusión y monitoreo de accesibilidad (RF-F15)</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
          Generar Reporte Mensual
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${metric.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{metric.label}</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Ticket Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Tickets de Accesibilidad Recientes</h3>
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold">3 Pendientes</span>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Error en lectura de PDF - Curso Matemáticas</p>
                  <p className="text-xs text-slate-500">Reportado por: Juan Pérez • Hace 2 horas</p>
                </div>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:underline">Gestionar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
