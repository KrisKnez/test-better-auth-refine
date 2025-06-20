import { CircularProgress } from '@mui/material';
import React from 'react'

const LoadingLayout = () => {
    return (
        <CircularProgress style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }} />
    )
}

export default LoadingLayout