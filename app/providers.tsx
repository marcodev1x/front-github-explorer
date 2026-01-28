'use client';

import React from 'react';

import AnimatedBackground from '@/components/animated-background';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#17c579',
        },

        gradientPrimary: 'linear-gradient(135deg, #17c579 40%, #0d8b55 100%)',
        text: {
            secondary: '#7588a3',
        },

        background: {
            default: '#0f1217',
            paper: '#171717',
        },
        secondary: {
            main: '#ff4081',
        },
    },
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider
            client={queryClient}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AnimatedBackground />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}