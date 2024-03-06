import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Grid, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { io, Socket } from "socket.io-client";
import e from 'express';
import SectionHeader from '../components/UI/PageLayout/SectionHeader';
import HomeSection from '../components/UI/PageLayout/HomeSection';
import AnimatedPage from './AnimatedPage';
import Chat from '../components/Chat/Chat';
import SectionWrapper from '../components/UI/PageLayout/SectionWrapper';
import PageWrapper from '../components/UI/PageLayout/PageWrapper';

const ENDPOINT = "http://localhost:5000";

interface User {
  id: string;
  name: string;
  email: string;

}

interface Msg {
    value: string;
    sender_id: string;
    sender_name: string;
    roomName: string;
    date: string; 

  }
const roomname = "1";

const ChatPage: React.FC = () => {
  const [photo,setUserPhoto]= useState('');
  const [textFieldValue, setTextFieldValue] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [msg, setMessage] = useState<Msg | null>(null);
  const [allMessages, setAllMessages] = useState<Msg[]>([]);
  const userItem = localStorage.getItem("user");
  var user: User | null = null;
  if (userItem) {
    user = JSON.parse(userItem);
  }
  useEffect (() => {
    

    
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
            setTextFieldValue('');
          }
          
        }
        
    };


  return (
    <AnimatedPage>
    <PageWrapper>
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
              sx={{color:"#9c27b0"}}
						/>
    <Paper elevation={0} sx={{width:"90%",height:"500px", borderRadius:"20px", alignSelf:"center", padding:"60px",maxHeight:"100%",backgroundColor:"white",overflow:"auto"}}>
      <ListItemText >
        {allMessages.map((m, index) => (
         <Chat msg={m} user={user || null} />
        ))}
      </ListItemText>
      </Paper>
      <Grid sx={{ width: "60%",marginTop:"10px", marginBottom:"7px"}}>
      <TextField 
            sx={{width:"100%"}}
            id="Text-Field"
            placeholder="Send a message..."
            variant='filled'
            InputProps={{
          style: { color: 'black',width:"100%"},
          
        }}  
        onChange={(e) =>{ setMessage({value:e.target.value  , sender_id: user?.id==null? "1":user.id, sender_name:user?.name==null?"me":user.name ,roomName:roomname,date: new Date().toISOString()} ) ; setTextFieldValue(e.target.value) }}
        value={textFieldValue} 
      />
      <Button onClick={sendMessage} variant="outlined" sx={{marginTop:"15px",color:"#9c27b0"}}>Send</Button>
      </Grid>
      
    </Grid>
    </PageWrapper>
    </AnimatedPage>
  );
};

export default ChatPage;
