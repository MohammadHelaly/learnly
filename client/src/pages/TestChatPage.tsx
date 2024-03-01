import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Grid, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { io, Socket } from "socket.io-client";
import e from 'express';
import SectionHeader from '../components/UI/PageLayout/SectionHeader';
import HomeSection from '../components/UI/PageLayout/HomeSection';
import AnimatedPage from './AnimatedPage';

const ENDPOINT = "http://localhost:5000";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface Msg {
    value: string;
    sender_id: string;
    sender_name: string;
    roomName: string;
  }
const roomname = "1";

const ChatPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [msg, setMessage] = useState<Msg | null>(null);
  const [allMessages, setAllMessages] = useState<Msg[]>([]);
  const userItem = localStorage.getItem("user");
  var user: User | null = null;
  if (userItem) {
    user = JSON.parse(userItem);
  }
  useEffect(() => {
    const newSocket: Socket = io(ENDPOINT);
    setSocket(newSocket);
    newSocket.emit("setup", user);
    newSocket.on('connection', () => setSocketConnected(true));
    newSocket.emit("join chat", "1");

    return () => {
      newSocket.close();
    };
    }, []);

    

  useEffect(() => {
        if (!socket) return;
        const messageReceived = (message: Msg) => {
            console.log("new msg:",message.value)
          setAllMessages(prevMessages => [...prevMessages, message]);
        };
        socket.on("message received", messageReceived); 
        return () => {
          socket.off("message received", messageReceived);
        };
      }, [socket]);

    
    const sendMessage = (e:any) => {
        if (msg !== null) {
          setAllMessages(prevMessages => [...prevMessages, msg]);
          if (socket) {
            socket.emit("newMessage", msg); // Assuming `content` should be `msg.value`
            setMessage(null); // Now correctly typed
            
          }
          
        }
    };


  return (
    <AnimatedPage>
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
   <SectionHeader
							heading=" Chat Room"
							headingAlignment="center"
              sx={{color:"white", marginTop:"55px"}}
						/>
    <Container className="styles"sx={{width:"70%",height:"500px", borderRadius:"20px", alignSelf:"center", padding:"20px",maxHeight:"80%",backgroundColor:"white",overflow:"auto"}}>
      <ListItemText >
        {allMessages.map((m, index) => (
          <Typography key={index}>{m.sender_id===user?.id ?"me": m.sender_name}: {m.value}</Typography>
        ))}
      </ListItemText>
      </Container>
      <Grid>
      <TextField sx={{color:"red", marginTop:"10px", marginBottom:"5px", paddingLeft:"5px"}} 
        onChange={(e) => setMessage({value:e.target.value  , sender_id: user?.id==null? "1":user.id, sender_name:user?.name==null?"no one":user.name ,roomName:roomname})} 
      />
      <Button onClick={sendMessage} sx={{marginTop:"20px",color:"white"}}>Send</Button>
      </Grid>
    </Grid>
    </AnimatedPage>
  );
};

export default ChatPage;