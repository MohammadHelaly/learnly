import React, { useState, ChangeEvent, useEffect } from 'react';  // Import ChangeEvent here
import { TextField, Button, Box } from '@mui/material';
import { io } from 'socket.io-client';

type Msg = {
    text: string;
    sender: string;
    name:string;
};

const roomNumber = 100;
const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

const Livechat: React.FC = () => {
    const [email,setEmail] = useState<string>();
    const [name,setName] = useState<string>();
    const [msg, setMsg] = useState<Msg | undefined>(undefined);
    const [Allmsg, setAllMsg] = useState<Msg []>([]);

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.emit('join-live-chat', roomNumber);

        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            const userObject = JSON.parse(userInfo);
            if (userObject.email) {
                setEmail(userObject.email);
            }
            if(userObject.name){
                setName(userObject.name)
            }
        }
        
        const handleReceiveMessage = (message: Msg) => {
            console.log('Message received:', message);
            setAllMsg(prevMessages => [...prevMessages, message]);
        };
        
        socket.on('receive-msg', handleReceiveMessage);
        
        return () => {
            socket.off('receive-msg', handleReceiveMessage);
            socket.close();
        };
    }, [email,name]); 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMsg({ text: e.target.value, sender: email ||"no-email",name:name||"anonymous"});  // Example setting sender statically
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (msg) {
            sendData(msg);
            setMsg(undefined);  
        }
    };



    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                {Allmsg.map((msg, index) => (
                    <p key={index}>{msg.name}: {msg.text}</p>
                ))}
            </div>
            <TextField
                label="Message"
                variant="outlined"
                value={msg?.text || ''}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Send
            </Button>
        </Box>
    );
};

// Function to simulate data sending
function sendData(data: Msg) {
    //add to allmsgs
    socket.emit('send-live-chat-msg',{msg:data,room:roomNumber})
}

export default Livechat;
