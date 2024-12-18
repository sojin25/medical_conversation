import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ChecklistItemProps {
  title: string;
  description: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  description,
  isCompleted,
  onToggle,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg mb-3 cursor-pointer transition-colors ${
        isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <CheckCircle
          className={`w-6 h-6 ${
            isCompleted ? 'text-green-500' : 'text-gray-300'
          }`}
        />
      </div>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
};