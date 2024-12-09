import React, { useEffect, useState } from 'react';

interface LiveStreamProps {
  token?: string; // Daily token
  id?: string; // User ID
}

export const LiveStream = React.forwardRef<HTMLIFrameElement, LiveStreamProps>(
  ({ token, id }, ref) => {
    const [sessionActive, setSessionActive] = useState<boolean | null>(null);

    useEffect(() => {
      const checkSession = async () => {
        if (!token || !id) {
          console.error('Token or User ID is missing.');
          setSessionActive(false);
          return;
        }

        try {
          const response = await fetch('/api/check-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });

          const result = await response.json();

          if (result.error) {
            console.error(result.error);
          }

          setSessionActive(result.active); // Backend should return { active: true/false }
        } catch (error) {
          console.error('Error checking session:', error);
          setSessionActive(false);
        }
      };

      checkSession();
    }, [token, id]); // Depend on both token and id

    if (sessionActive === null) {
      return (
        <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center p-6">
            <p className="text-gray-600">Checking session...</p>
          </div>
        </div>
      );
    }

    if (sessionActive) {
      return (
        <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-500 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-gray-600">Session already active or invalid token.</p>
          </div>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold mb-2">Invalid Token</h3>
            <p className="text-gray-600">Please provide a valid token to access the livestream.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          ref={ref}
          title="Live Stream"
          className="w-full h-full"
          src={`https://workenligne.daily.co/WorkEnLigne_Webinars?t=${token}`}
          frameBorder="0"
          allow="camera; microphone; fullscreen; autoplay"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
);

LiveStream.displayName = 'LiveStream';
