import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ScenarioUploadProps {
  onUpload: (scenario: File) => void;
}

export const ScenarioUpload: React.FC<ScenarioUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      setFile(uploadedFile);
      onUpload(uploadedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      onUpload(uploadedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleChange}
          className="hidden"
          id="scenario-upload"
        />
        
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label
          htmlFor="scenario-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          シナリオファイルをドラッグ＆ドロップ
          <br />
          または
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
            {' '}クリックしてアップロード
          </span>
        </label>
        <p className="text-xs text-gray-500">
          JSONファイル形式 (.json)
        </p>

        {file && (
          <div className="mt-4 p-2 bg-gray-50 rounded flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {file.name}
            </span>
            <button
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};