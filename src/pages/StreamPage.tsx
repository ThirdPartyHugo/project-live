import React, { useRef } from 'react';
import { Header } from '../components/Header';
import { LiveStream } from '../components/LiveStream';
import { MessageSquare, Users } from 'lucide-react';

export function StreamPage() {
  const liveStreamRef = useRef<HTMLIFrameElement>(null);

  // Extract token from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('t'); // The token parameter

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Main Stream Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-4">Live Workshop</h1>
              <LiveStream 
                ref={liveStreamRef} 
                token={token} // Pass the token to the LiveStream component
              />
              <div className="mt-4">
                <h2 className="font-semibold mb-2">About This Session</h2>
                <p className="text-gray-600">
                  Join us for a live demonstration of professional workflows and best practices
                  in client project management. Feel free to ask questions in the chat!
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </main>
    </div>
  );
}
