import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { Card, CardContent, Typography, Avatar, Box,Button, TextField } from "@mui/material";
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
interface MessageBubbleProps {
	msg: Partial<Message>;
	editmsg:(message:string,date:string)=>void;
	
}

function getTimeDifference(dateString: string): string {
	const inputDate = new Date(dateString);
	const currentDate = new Date();
	const timeDifference = currentDate.getTime() - inputDate.getTime();
	const minutesDifference = Math.floor(timeDifference / (1000 * 60));
	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

	if (minutesDifference < 1) {
		return "just now";
	} else if (minutesDifference < 60) {
		return `${minutesDifference} minutes ago`;
	} else {
		return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
	}
}


const MessageBubble: React.FC<MessageBubbleProps> = ({ msg,editmsg }) => {
	const  message  = msg;
	const authContext = useContext(AuthContext);
	const user = authContext.user;
    const [isEditing, setIsEditing] = useState(false);
	const [EditedMsg, SetNewMsg] = useState(message.content);


  const handleEdit = () => {
	setIsEditing(!isEditing)
  };

  	if(message.content==="Deleted Message"){
		return(
		<Card
			sx={{
				borderRadius: 6,
				display: "flex",
				flexDirection: "column",
				overflowWrap: "anywhere",
				backgroundColor: "grey",
				alignSelf:
					message?.sender?.id === user?.id
						? "flex-end"
						: "flex-start",
				width: window.innerWidth > 600 ? "50%" : "80%",
				boxShadow: "none",
			}}>
			
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" >
					Deleted Message
				</Typography>
			</CardContent>
		</Card>
		)
	}

	return (
		<>
		<Card
			sx={{
				borderRadius: 6,
				display: "flex",
				flexDirection: "column",
				overflowWrap: "anywhere",
				backgroundColor:
					message?.sender?.id === user?.id ? "#00f3b6" : "#9c27b0",
				alignSelf:
					message?.sender?.id === user?.id
						? "flex-end"
						: "flex-start",
				width: window.innerWidth > 600 ? "50%" : "80%",
				boxShadow: "none",
			}}>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Avatar
					src={message?.sender?.photo?.url}
					sx={{ marginRight: 1, bgcolor: "black" }}>
					{message?.sender?.name.slice(0, 1)}
				</Avatar>
				<Box>
					<Typography sx={{ fontWeight: "bold" }} color="black">
						{message?.sender?.id === user?.id
							? "You"
							: message?.sender?.name}
					</Typography>
					<Typography color="text.secondary" sx={{ fontSize: 12 }}>
						{getTimeDifference(message.createdAt as string)}
					</Typography>
				</Box>
				{message?.sender?.id === user?.id && (
          <Box sx={{ marginLeft: "auto", display:"flex"}}>
			{message?.sender?.id === user?.id && (
					<EditIcon onClick={handleEdit} sx={{
						marginRight: "2%", 
						
					}} />
				)}
			{message?.sender?.id === user?.id && (
  					<Delete onClick={() => editmsg("Deleted Message",message?.createdAt?.toString() || "defaultDateString")} />
  				)}
          </Box>
        )}
			</CardContent>
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" sx={{ fontWeight: "bold" }}>
					{message.content}
				</Typography>
			</CardContent>
		</Card>
		{isEditing && (
		<Box sx={{display:"flex"}}>
		<TextField
			onChange={(e)=>{SetNewMsg(e.target.value)}}				
			size="small"
			multiline									
			defaultValue={message.content}
			sx={{
			backgroundColor:
			"transparent",
			width:"90%",
			paddingRight:"3%"
			}}
			placeholder="Send a message..."
			InputProps={{
			sx: {
			borderRadius: 5,
			px: 2,
			backgroundColor:
			"white",
			},
			}}									
			/>
			<Button
				type="submit"
				onClick={()=>{
					if(message?.content ){
						editmsg(EditedMsg||"",message?.createdAt?.toString() || "defaultDateString")
					}							
					setIsEditing(false)		
							}
						}
				variant="outlined"
				size="large"
				endIcon={<EditIcon />}
				sx={{
				backgroundColor: "white",
				color: "primary.main",
				width:"10%",
				}}>
				Edit
			</Button>
		</Box>
		)}
		</>
	);
};

export default MessageBubble;
