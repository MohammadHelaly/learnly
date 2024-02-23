import React from 'react';
import { Box,TextField,Typography,Rating, Button,MenuItem, ButtonGroup,Grid } from '@mui/material';
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
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)', 
      width: 'auto', 
      p: 2, 
        bgcolor: 'white',
        boxShadow: 24,
        border: '1px solid #9c27b0',     
    }}
  >
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          id="outlined-select-difficulty"
          select
          label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          variant="outlined"
          fullWidth 
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          value={price}
          id="outlined-basic"
          label="Max. Price"
          variant="outlined"
          type="number"
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          type="number"
          value={minHours}
          id="outlined-basic-minHours"
          label="Min. Hours"
          variant="outlined"
          fullWidth
          onChange={(e) => setMinHours(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          type="number"
          value={maxHours}
          id="outlined-basic-maxHours"
          label="Max. Hours"
          variant="outlined"
          fullWidth
          onChange={(e) => setMaxHours(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography component="legend" sx={{ fontSize: '20px', mt: 2 }}>
          Minimum Rating
        </Typography>
        <Rating
          name="customized-empty"
          defaultValue={0}
          value={Ratings}
          precision={1}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup>
          <Button
            onClick={() => SendFilters({ difficulty, price, minHours, maxHours, Ratings })}
            variant="contained"
            size="medium"
          >
            Apply Changes
          </Button>
          <Button
            onClick={ResetChanges}
            variant="outlined"
            size="medium"
          >
            Reset Changes
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  </Box>
  );
};
