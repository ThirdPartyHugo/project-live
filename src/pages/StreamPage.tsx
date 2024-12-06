import React from 'react';
import { Header } from '../components/Header';
import { LiveStream } from '../components/LiveStream';
import { MessageSquare, Users } from 'lucide-react';

export function StreamPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stream Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-4">Live Workshop</h1>
              <LiveStream 
                serverUrl={import.meta.env.VITE_STREAM_SERVER_URL} 
                streamKey={import.meta.env.VITE_STREAM_KEY}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stream Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Stream Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>Viewers: <span id="viewer-count">0</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat Messages: <span id="message-count">0</span></span>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Live Chat</h2>
              <div className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-2" id="chat-messages">
                  <p className="text-gray-500 text-center">Welcome to the live chat!</p>
                </div>
                <div className="border-t pt-4">
                  <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}