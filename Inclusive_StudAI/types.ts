import React from 'react';

// --- MVC: Models Interfaces ---

export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: {
    highContrast: boolean;
    fontSize: 'normal' | 'large' | 'xl';
    voiceSpeed: number;
  };
  consents: {
    dataCollection: boolean;
    voiceRecording: boolean;
  };
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: 'academic' | 'medical' | 'administrative';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  materials: {
    id: string;
    title: string;
    type: 'pdf' | 'audio' | 'text';
  }[];
}

export interface Metric {
  label: string;
  value: string | number;
  change: number; // percentage
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- Global Declarations ---
declare global {
  interface Window {
    Tesseract: any;
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}