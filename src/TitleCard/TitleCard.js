import React from 'react';
import './TitleCard.css';
import { Box, Paper, Typography } from '@material-ui/core';


export default function TitleCard(){
    return (
    <Box >
        <Paper>
            <div className="title">
                <Typography variant='h1' component='h1'>Machine Music</Typography>
            </div>
            <div className="subtitle">
            <Typography variant='h4' component='h4'>Procedurally generated music, powered by machine learning</Typography>
            </div>
        </Paper>
    </Box>
    )
}