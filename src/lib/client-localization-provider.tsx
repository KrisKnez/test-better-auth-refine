"use client"

import React from 'react'

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Props = {
    children: React.ReactNode;
}

const ClientLocalizationProvider = ({ children }: Props) => {
    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hr" >
        {children}
    </LocalizationProvider>
}

export default ClientLocalizationProvider