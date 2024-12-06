import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface LiveStreamProps {
  streamKey?: string;
  serverUrl?: string;
}

export function LiveStream({ streamKey, serverUrl }: LiveStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!streamKey || !serverUrl || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    
    // Create a new MediaSource instance
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', () => {
      // Connect to the custom flux server
      const ws = new WebSocket(serverUrl);
      
      ws.onopen = () => {
        // Send stream key for authentication
        ws.send(JSON.stringify({ type: 'auth', streamKey }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'stream-data') {
            // Handle incoming stream data
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
            sourceBuffer.appendBuffer(data.buffer);
          }
        } catch (error) {
          console.error('Error processing stream data:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    });

    return () => {
      // Cleanup
      if (video.src) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [streamKey, serverUrl]);

  if (!streamKey || !serverUrl) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Stream Not Available</h3>
          <p className="text-gray-600">Please check your stream credentials or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        playsInline
      />
    </div>
  );
}