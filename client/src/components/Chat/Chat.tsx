import React from 'react';
import { Card, CardContent, Typography, CardHeader } from '@mui/material';

interface Message {
  sender_id: string;
  sender_name: string;
  value: string;
  date: string; 
}

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface ChatProps {
  msg: Message;
  user: User|null;
}

function getTimeDifference(dateString: string): string {
  // Parse the input date string to a Date object
  const inputDate = new Date(dateString);
  // Get the current date and time
  const currentDate = new Date();
  // Calculate the difference in time (in milliseconds)
  const timeDifference = currentDate.getTime() - inputDate.getTime();
  // Convert the time difference from milliseconds to minutes
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  // Check if the difference is less than one minute
  if (minutesDifference < 1) {
    return "just now";
  } else {
    // Return the difference in minutes
    return `${minutesDifference} minutes ago`;
  }
}

const Chat: React.FC<ChatProps> = ({ msg, user }) => {
  return (
    <Card style={{backgroundColor: msg.sender_id===user?.id?"#F3CCF3":"whitesmoke"}} sx={{borderRadius:2,marginBottom:2,display:"flex",flexDirection:"column",maxWidth:"100%",overflowWrap:"anywhere"}}>
      <CardContent>
      <Typography variant="h6" color="text.secondary">
      {user && msg.sender_id === user.id ? "Me" : msg.sender_name}
        </Typography>
        <>{getTimeDifference(msg.date)}</>
        <Typography variant="h5" color="text.secondary">
          {msg.value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Chat;
