import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { Button, Grid, Paper, Typography, IconButton, Box, Container } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import PageWrapper from '../components/UI/PageLayout/PageWrapper';

interface PeersRecord {
  [userId: string]: { call: MediaConnection, video: HTMLVideoElement };
}

const Livestreamdev: React.FC = () => {
  const ENDPOINT = "http://localhost:5000";
  const roomNumber = 123; // Define the room number here
  const videoGrid = useRef<HTMLDivElement>(null);
  const myVideo = useRef<HTMLVideoElement>(document.createElement('video'));
  const [peers, setPeers] = useState<PeersRecord>({});
  const [muted, setMuted] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);

  useEffect(() => {
    const socket = io(ENDPOINT);
    myVideo.current.muted = true;
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
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
   // Mute local user's audio to prevent self-feedback
  if (stream === myVideo.current.srcObject) {
    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = false;
    });
  }
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    video.style.width = '100%';  // Ensures video fills the cell
    video.style.height = '100%'; // Ensures video fills the cell
    if (videoGrid.current) {
      videoGrid.current.append(video);
    }
  }

  const toggleMute = () => {
    if (myVideo.current) {
      const newValue = !myVideo.current.muted;
      myVideo.current.muted = newValue;
      setMuted(newValue);
    }
  };

  const toggleCamera = () => {
    if (myVideo.current.srcObject) {
      const tracks = (myVideo.current.srcObject as MediaStream).getVideoTracks();
      tracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraEnabled(prev => !prev);
    }
  };

  return (
    <>
    <div style={{ backdropFilter:'blur(8px)',position:'absolute',zIndex:-1, filter:'brightness(0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'100vw' }}/>

   <PageWrapper sx={{backgroundColor:'transparent'}}>
   
    <Container maxWidth="lg">
    <Box sx={{  display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100%',mt:window.innerWidth>600?8:7 }}>
        <Box sx={{flexGrow:1,width:'100%' }}>
          <div ref={videoGrid} id="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', justifyContent: 'center' }} />
        </Box>
        </Box>
    </Container>
    </PageWrapper>
    <Box sx={{zIndex:10,backdropFilter:'blur(16px)',mx:'auto',py:4, bottom:0, position:'fixed',width:'100%',display:'flex', flexDirection:'row',justifyContent:'center',alignItems:'center',gap:2,alignContent:'center',justifyItems:'center' }}>
          <IconButton onClick={toggleMute} color="primary" sx={{backgroundColor:'white',borderRadius:'100%'}}>
            {muted ? <Mic /> :<MicOff />}
          </IconButton>
          <IconButton onClick={toggleCamera} color="primary" sx={{backgroundColor:'white',borderRadius:'100%'}}>
            {cameraEnabled ?   <Videocam /> :<VideocamOff />}
          </IconButton>
        </Box>

    </>
  );
};

export default Livestreamdev;