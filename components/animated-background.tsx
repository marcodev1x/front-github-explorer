'use client';

import { Box, useTheme } from '@mui/material';

export default function AnimatedBackground() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                overflow: 'hidden',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: 420,
                    height: 420,
                    borderRadius: '50%',
                    background: theme.palette.primary.main,
                    filter: 'blur(140px)',
                    opacity: 0.2,
                    top: '15%',
                    left: '10%',
                    animation: 'float1 18s ease-in-out infinite',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: 360,
                    height: 360,
                    borderRadius: '50%',
                    background: theme.palette.primary.main,
                    filter: 'blur(160px)',
                    opacity: 0.15,
                    bottom: '10%',
                    right: '15%',
                    animation: 'float2 22s ease-in-out infinite',
                }}
            />

            <style jsx global>{`
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(80px, -60px);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-60px, 70px);
          }
        }
      `}</style>
        </Box>
    );
}
