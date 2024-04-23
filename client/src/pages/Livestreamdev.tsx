import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer,{MediaConnection} from 'peerjs';

interface PeersRecord {
  [userId: string]: MediaConnection; 
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
      audio: true
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
        connectToNewUser(userId, stream, myPeer);
      });

      socket.on('user-disconnected', userId => {
        if (peers[userId]) peers[userId].close();
        setPeers(prevPeers => {
          const newPeers = { ...prevPeers };
          delete newPeers[userId];
          return newPeers;
        });
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
      Object.values(peers).forEach(call => call.close());
    };
  }, [peers]);

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
      [userId]: call
    }));
  }

  function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    if (videoGrid.current) {
      videoGrid.current.append(video);
    }
  }

  return (
    <div ref={videoGrid} id="video-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 300px)',
      gridAutoRows: '300px'
    }} />
  );
};

export default Livestreamdev;
