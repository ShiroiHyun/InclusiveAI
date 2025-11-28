import { User, Appointment, Course, Metric } from '../types';

const STORAGE_KEY = 'inclusive_studai_db_v1';

// Initial Seed Data (Default state)
const DEFAULT_DATA = {
  users: [
    {
      id: 'u1',
      name: 'Juan Pérez',
      email: 'juan@estudiante.edu',
      role: 'student',
      preferences: { highContrast: false, fontSize: 'normal', voiceSpeed: 1.0 },
      consents: { dataCollection: true, voiceRecording: false }
    },
    {
      id: 'a1',
      name: 'Admin Sistema',
      email: 'admin@edu.pe',
      role: 'admin',
      preferences: { highContrast: false, fontSize: 'normal', voiceSpeed: 1.0 },
      consents: { dataCollection: true, voiceRecording: true }
    }
  ] as User[],
  appointments: [
    { id: '1', title: 'Tutoría de Matemáticas', date: '2025-05-10 10:00', status: 'confirmed', type: 'academic' },
    { id: '2', title: 'Revisión Médica', date: '2025-05-12 14:00', status: 'pending', type: 'medical' }
  ] as Appointment[],
  courses: [
    { 
      id: 'c1', name: 'Ingeniería de Sistemas', code: 'IS-101', 
      materials: [
        { id: 'm1', title: 'Introducción a la IA.pdf', type: 'pdf' },
        { id: 'm2', title: 'Clase Grabada - Semana 1', type: 'audio' }
      ] 
    },
    { 
      id: 'c2', name: 'Accesibilidad Digital', code: 'AD-202', 
      materials: [
        { id: 'm3', title: 'Guía WCAG 2.1', type: 'text' }
      ] 
    }
  ] as Course[],
  metrics: [
    { label: 'Usuarios Activos', value: 1250, change: 12 },
    { label: 'Documentos Procesados (OCR)', value: 8500, change: 5 },
    { label: 'Satisfacción (NPS)', value: 92, change: 2 }
  ] as Metric[]
};

// Simulated Database State with LocalStorage Persistence
class AppStore {
  private users: User[];
  private appointments: Appointment[];
  private courses: Course[];
  private metrics: Metric[];

  constructor() {
    const loadedData = this.loadFromStorage();
    this.users = loadedData.users;
    this.appointments = loadedData.appointments;
    this.courses = loadedData.courses;
    this.metrics = loadedData.metrics;
  }

  // --- Persistence Logic ---
  private saveToStorage() {
    const data = {
      users: this.users,
      appointments: this.appointments,
      courses: this.courses,
      metrics: this.metrics
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving to LocalStorage", e);
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error loading from LocalStorage", e);
    }
    return DEFAULT_DATA;
  }

  // --- Methods to interact with data (Model Logic) ---
  
  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  getAppointments(userId: string): Appointment[] {
    // In a real DB, we would filter by userID
    return this.appointments;
  }

  getCourses(userId: string): Course[] {
    return this.courses;
  }

  getMetrics(): Metric[] {
    return this.metrics;
  }

  updateUserPreferences(userId: string, prefs: Partial<User['preferences']>): User | undefined {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].preferences = { ...this.users[userIndex].preferences, ...prefs };
      this.saveToStorage(); // Persist change
      return this.users[userIndex];
    }
    return undefined;
  }

  updateUserConsents(userId: string, consents: Partial<User['consents']>): User | undefined {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].consents = { ...this.users[userIndex].consents, ...consents };
      this.saveToStorage(); // Persist change
      return this.users[userIndex];
    }
    return undefined;
  }

  // Example: Add functionality to create appointments to show DB writes
  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
    this.saveToStorage();
  }
}

export const db = new AppStore();