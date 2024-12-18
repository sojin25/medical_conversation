import React, { useState } from 'react';
import { InterviewTimer } from './components/InterviewTimer';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { PatientInfo } from './components/PatientInfo';
import { Message, PatientCase } from './types';
import { Stethoscope, Settings } from 'lucide-react';
import { analyzeMessage } from './utils/messageAnalyzer';
import { useOllama } from './hooks/useOllama';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'patient',
      content: 'こんにちは、診察をお願いします。',
      timestamp: new Date(),
    },
  ]);

  const [showAdmin, setShowAdmin] = useState(false);
  const { generateResponse, isLoading } = useOllama();

  const patientCase: PatientCase = {
    id: '1',
    name: '山田 太郎',
    birthDate: '1980年5月15日',
    chiefComplaint: '3日前からの発熱と咳',
    scenario: '発熱と咳が主訴の患者のシナリオ',
    goodQuestions: [
      '熱は何度ですか',
      '咳はいつからですか',
      '他の症状はありますか',
      '薬は飲んでいますか'
    ]
  };

  const handleSendMessage = async (content: string) => {
    const isGoodQuestion = analyzeMessage(content, patientCase.goodQuestions);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'doctor',
      content,
      timestamp: new Date(),
      isGoodQuestion
    };
    setMessages((prev) => [...prev, newMessage]);

    // Ollamaを使用して応答を生成
    const prompt = `
あなたは医療面接の練習のための患者役です。
以下の設定に基づいて、医師からの質問に対して適切に応答してください：

患者情報：
- 名前: ${patientCase.name}
- 生年月日: ${patientCase.birthDate}
- 主訴: ${patientCase.chiefComplaint}
- シナリオ: ${patientCase.scenario}

医師の質問: ${content}

応答の際は以下の点に注意してください：
- 患者の立場から自然な応答をすること
- 医学的に適切な情報を含めること
- 簡潔で分かりやすい言葉を使うこと
`;

    const response = await generateResponse(prompt);
    if (response) {
      const patientResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'patient',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, patientResponse]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                医療面接トレーニング
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <InterviewTimer />
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <PatientInfo patient={patientCase} />
            {showAdmin && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">管理者設定</h2>
                {/* ScenarioUpload component */}
              </div>
            )}
          </div>
          <div className="col-span-2 bg-white rounded-lg shadow-sm border flex flex-col h-[600px]">
            <ChatWindow messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;