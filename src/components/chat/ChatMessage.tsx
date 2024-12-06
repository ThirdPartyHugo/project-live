import React from 'react';
import { User } from 'lucide-react';

interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: Date;
  isAdmin?: boolean;
}

export function ChatMessage({ username, message, timestamp, isAdmin }: ChatMessageProps) {
  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAdmin ? 'bg-indigo-100' : 'bg-gray-100'
      }`}>
        <User className={`w-4 h-4 ${isAdmin ? 'text-indigo-600' : 'text-gray-600'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isAdmin ? 'text-indigo-600' : 'text-gray-900'}`}>
            {username}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-gray-600 break-words">{message}</p>
      </div>
    </div>
  );
}