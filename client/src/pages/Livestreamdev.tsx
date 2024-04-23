import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';

interface PeersRecord {
  [userId: string]: { call: MediaConnection, video: HTMLVideoElement };
}

const Livestreamdev: React.FC = () => {
  const ENDPOINT = "http://localhost:5000";
  const roomNumber = 123; // Define the room number here
  const videoGrid = useRef<HTMLDivElement>(null);
  const myVideo = useRef<HTMLVideoElement>(document.createElement('video'));
  const [peers, setPeers] = useState<PeersRecord>({});

  useEffect(() => {
    const socket = io(ENDPOINT);
    myVideo.current.muted = true;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      addVideoStream(myVideo.current, stream);

      const myPeer = new Peer('', {
        host: '/',
        port: 3001
      });

      myPeer.on('open', id => {
        socket.emit('join-room', roomNumber, id);
      });

      socket.on('user-connected', userId => {
        // Prevent duplicate calls
        if (!peers[userId]) {
          connectToNewUser(userId, stream, myPeer);
        }
      });

      socket.on('user-disconnected', userId => {
        if (peers[userId]) {
          peers[userId].video.remove(); // Remove video element
          peers[userId].call.close();
          setPeers(prevPeers => {
            const newPeers = { ...prevPeers };
            delete newPeers[userId];
            return newPeers;
          });
        }
      });

      myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream);
        });
      });
    });

    return () => {
      socket.close();
      // Clean up peer connections
      Object.values(peers).forEach(peer => {
        peer.call.close();
        peer.video.remove();
      });
    };
  }, []); // Remove `peers` from dependency array to avoid re-runs

  function connectToNewUser(userId: string, stream: MediaStream, myPeer: Peer) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });

    call.on('close', () => {
      video.remove();
    });

    call.on('error', (error: any) => {
      console.error('Call error with', userId, error);
    });

    setPeers(prevPeers => ({
      ...prevPeers,
      [userId]: { call, video }
    }));
  }

  function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    video.style.width = '100%';  // Ensures video fills the cell
    video.style.height = '100%'; // Ensures video fills the cell
    if (videoGrid.current) {
      videoGrid.current.append(video);
    }
  }

  return (
    <div ref={videoGrid} id="video-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 300px)',
      gridAutoRows: '300px',
      gap: '10px', // This adds a gap between each video grid cell
      padding: '10px' // This adds padding around the grid to ensure it's not flush with the edges of its container
    }} />
  );
};

export default Livestreamdev;
