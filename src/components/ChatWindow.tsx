import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { User, UserRound, ThumbsUp } from 'lucide-react';
import { useAutoScroll } from '../hooks/useAutoScroll';

interface ChatWindowProps {
  messages: Message[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const scrollRef = useAutoScroll(messages);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.role === 'doctor' ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              message.role === 'doctor' ? 'bg-blue-100' : 'bg-green-100'
            }`}
          >
            {message.role === 'doctor' ? (
              <User className="w-5 h-5 text-blue-600" />
            ) : (
              <UserRound className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div className="relative">
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'doctor'
                  ? 'bg-blue-50 text-blue-900'
                  : 'bg-green-50 text-green-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {formatDistanceToNow(message.timestamp, {
                  addSuffix: true,
                  locale: ja,
                })}
              </span>
            </div>
            {message.isGoodQuestion && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                <ThumbsUp className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};