import React from 'react';
import { PatientCase } from '../types';
import { ClipboardList } from 'lucide-react';

interface PatientInfoProps {
  patient: PatientCase;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-3">
        <ClipboardList className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">患者情報</h2>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">氏名:</span> {patient.name}</p>
        <p><span className="font-medium">生年月日:</span> {patient.birthDate}</p>
        <p><span className="font-medium">主訴:</span> {patient.chiefComplaint}</p>
      </div>
    </div>
  );
};