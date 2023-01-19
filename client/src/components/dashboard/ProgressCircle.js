import { Box, Typography } from "@mui/material";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const ProgressCircle = ({progress}) => {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress color="secondary" variant="determinate" value={progress}/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${progress}%`}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProgressCircle;

