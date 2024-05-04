import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { Container, Box, IconButton,Button } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import PageWrapper from '../components/UI/PageLayout/PageWrapper';
import Livechat from '../components/LiveStream/Livechat';

interface PeersRecord {
  [userId: string]: { call: MediaConnection, video: HTMLVideoElement };
}

const Livestreamdev: React.FC = () => {
  const ENDPOINT = "http://localhost:5000";
  const roomNumber = 123;
  const videoGrid = useRef<HTMLDivElement>(null);
  const myVideo = useRef<HTMLVideoElement>(document.createElement('video'));
  const [peers, setPeers] = useState<PeersRecord>({});
  const [muted, setMuted] = useState<boolean>(true); // Muted by default
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false); // Camera off by default
  const [init,setInit]  = useState<boolean>(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const socket = io(ENDPOINT);
    const myPeer = new Peer('', {
      host: '/',
      port: 3001
    });
  
    socket.emit('get-room-size', roomNumber, (roomMembersCount: number) => {
      console.log(`Room members count: ${roomMembersCount}`);
      // Set as initiator if first to join
      const isInitiator = roomMembersCount === 0;
      setInit(isInitiator);
      console.log(isInitiator ? 'i am initiator' : 'not initiator');
  
      // Access my own media
      navigator.mediaDevices.getUserMedia({
        video: isInitiator,
        audio: true,
      }).then(stream => {
        if (isInitiator) {
          myVideo.current.srcObject = stream;
          addVideoStream(myVideo.current, stream);
        }
        
        myPeer.on('open', id => {
          socket.emit('join-room', roomNumber, id);
        });
  
        // When a new user connects, only initiator sends the stream
        socket.on('user-connected', userId => {
          if (isInitiator) {
            connectToNewUser(userId, stream, myPeer);
          }
        });
  
        // Handle disconnection
        socket.on('user-disconnected', userId => {
          if (peers[userId]) {
            peers[userId].video.remove();
            peers[userId].call.close();
            setPeers(prevPeers => {
              const newPeers = { ...prevPeers };
              delete newPeers[userId];
              return newPeers;
            });
          }
        });
  
        // Receive calls
        myPeer.on('call', call => {
          call.answer(stream); 
          const video = document.createElement('video');
          call.on('stream', userVideoStream => {
            if (!isInitiator) {
              addVideoStream(video, userVideoStream);
            }
          });
        });
      });
    });
  
    return () => {
      socket.close();
      Object.values(peers).forEach(peer => {
        peer.call.close();
        peer.video.remove();
      });
    };
  }, [init]); 

  function connectToNewUser(userId: string, stream: MediaStream | null, myPeer: Peer) {
    const video = document.createElement('video');
  
    if (stream) {
      const call = myPeer.call(userId, stream);
  
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
    } else {

      console.log("No local stream available to send, waiting for incoming connections.");
    }
  }
  

  function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    if(video){
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      video.style.width = '100%'; 
      video.style.height = '100%'; 
      if (videoGrid.current) {
        videoGrid.current.append(video);
      }
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

  const shareScreen = () => {
   console.log("Share screen");
  };

  return (
    <>
<PageWrapper sx={{ backgroundColor: 'transparent' }}>
  <Container maxWidth="xl">  
    <Box sx={{
      flexGrow: 1,
      width: '100%'
    }}>
      <div ref={videoGrid} id="video-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',  // Adjusted the min-width to 500px
        gap: '20px',  
        justifyContent: 'center',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}>
        <Livechat/>
      </div>
      
    </Box>
  </Container>
  <style>{`
    #video-grid video {
      border-radius: 10px;
    }
  `}</style>
</PageWrapper>



    <Box sx={{zIndex:10,mx:'auto',py:4, bottom:0, position:'fixed',width:'100%',display:'flex', flexDirection:'row',justifyContent:'center',alignItems:'center',gap:2,alignContent:'center',justifyItems:'center' }}>
          <IconButton onClick={toggleMute} color="primary" sx={{backgroundColor:'white',borderRadius:'100%'}}>
            {muted ? <Mic /> :<MicOff />}
          </IconButton>
          <IconButton onClick={toggleCamera} color="primary" sx={{backgroundColor:'white',borderRadius:'100%'}}>
            {cameraEnabled ?   <Videocam /> :<VideocamOff />}
          </IconButton>
                <Button onClick={shareScreen} color="primary" variant="contained">
                  Share Screen
                </Button>

          
        </Box>
    </>
  );
};

export default Livestreamdev;