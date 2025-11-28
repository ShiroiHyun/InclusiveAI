import React from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Appointment } from '../types';

interface ScheduleProps {
  appointments: Appointment[];
}

const Schedule: React.FC<ScheduleProps> = ({ appointments }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Agenda Académica</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium text-sm">
          + Nueva Cita
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div 
              key={apt.id} 
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  apt.type === 'academic' ? 'bg-blue-100 text-blue-600' :
                  apt.type === 'medical' ? 'bg-red-100 text-red-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{apt.title}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" /> {new Date(apt.date).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" /> Campus Central
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {apt.status === 'confirmed' ? 'Confirmado' : apt.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                </span>
                {apt.status === 'pending' && (
                  <div className="flex gap-1">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Confirmar">
                      <CheckCircleIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Cancelar">
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No tienes citas programadas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;