import React from 'react';
import { Box,TextField,Typography,Rating, Button,MenuItem } from '@mui/material';
import { useState } from 'react'; 
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InputAdornment from '@mui/material/InputAdornment';

interface FilterProps {
    SendFilters: (data: any) => void; // Use a more specific type instead of 'any' based on your data
  }

export const  Filter: React.FC<FilterProps> = ({ SendFilters }) =>{
    const [difficulty, setDifficulty] = useState('');
    const [price, setPrice] = useState('');
    const [minHours, setMinHours] = useState('');
    const [maxHours, setMaxHours] = useState('');
    const [Ratings, setRating] = useState<number | null>(0);
    

    const ResetChanges = () => {
        setDifficulty('');
        setPrice('');
        setMinHours('');
        setMaxHours('');
        setRating(null);
    }
  return (
    <Box
      sx={{
        position: 'fixed', // Or 'absolute' depending on your needs
        top: '13%', // Adjusted to start from 15% from the top of the screen
        left: '50%', // Start from the middle of the screen horizontally
        transform: 'translateX(-50%)', // Center the box horizontally
        width: '40%', // Adjusted to half of the page width for demonstration
        height: '45vh', // Example height, adjust as needed
        backgroundColor: 'white', // Adjusted background color for visibility
        zIndex: 1000, // Ensure it's above other content
        border: '1px solid #9c27b0', // Example border: 2px solid and white
        borderRadius: '24px', // Rounded corners with a radius of 16px
      }}
    >
        <Box
            sx={{
                position: 'absolute', 
                top: '10%',
                left: '7%', 
                }}
            >
                <TextField
                            id="outlined-select-difficulty"
                            select
                            label="Difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            variant="outlined"
                            sx={{
                                minWidth: 240, // Adjust the width as needed
                }}
                        >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                </TextField>      

                <TextField
                    sx={{ marginLeft: '30px',width: 240}}
                    value={price}
                    id="outlined-basic"
                    label="Max. Price"
                    variant="outlined"
                    type='number'
                    
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    }}
                />            
            <TextField sx={{marginTop:'25px'}} type='number' value={minHours} id="outlined-basic" label="Minimum Hours" variant="outlined" onChange={(e)=>setMinHours(e.target.value)} />
            <TextField sx={{marginTop:'25px',marginLeft:'30px'}} type='number' value={maxHours}  id="outlined-basic" label="Maximum Hours" variant="outlined" onChange={(e)=>setMaxHours(e.target.value)} />

            <Typography sx={{marginTop:'10px',fontSize:'30px'}}  component="legend">Minimum Rating</Typography>
            <Rating
                name="customized-empty"
                defaultValue={0}
                value={Ratings}
                precision={1}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event: React.ChangeEvent<{}>, newValue: number | null) => {
                    setRating(newValue);
                }}
                size="large"
            />
            <Button
                onClick={() => SendFilters({ filterValue: { difficulty, price, minHours, maxHours, Ratings}})    }
                sx={{
                    marginLeft: '240px',
                    size: 'medium', // This should be moved outside `sx` and into the `size` prop
                    marginTop: '-20px' // Adjust this value as needed to move the button upwards
                }}
                variant="contained"
                >
                Apply Changes
            </Button>
            <Button sx={{marginTop:'-60px',marginLeft:'250px',size:'medium'}} variant="outlined" onClick={ResetChanges}>
                        Reset Changes
            </Button>
        </Box>
        
                
    </Box>
  );
};
