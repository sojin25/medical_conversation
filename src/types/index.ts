export interface Message {
  id: string;
  role: 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  isGoodQuestion?: boolean;
}

export interface PatientCase {
  id: string;
  name: string;
  birthDate: string;
  chiefComplaint: string;
  scenario: string;
  goodQuestions: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  patientCase: PatientCase;
  responses: {
    trigger: string[];
    response: string;
  }[];
}