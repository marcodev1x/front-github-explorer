'use client';

import { Card, Typography, useTheme } from '@mui/material';
import { LucideGithub } from 'lucide-react';

import styles from './header.module.css';

export default function Header() {
    const theme = useTheme();

    return (
        <div className={styles.headerContainer}>
            <Card
                variant={'elevation'}
                className={styles.headerCard}
                elevation={1}
            >
                <LucideGithub
                    color={theme.palette.primary.main}
                    size={24}
                    width={48}
                    height={48}
                />
            </Card>
            <div className={styles.headerContent}>
                <div
                    className={styles.header}
                >
                    <Typography
                        variant={'h1'}
                        component={'h1'}
                        fontSize={56}
                        fontWeight={500}
                    >
                        Explore o
                    </Typography>
                    <Typography
                        variant={'h1'}
                        component={'h1'}
                        fontSize={56}
                        fontWeight={600}
                        sx={{
                            background: theme.palette.gradientPrimary,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        GitHub
                    </Typography>
                </div>
                <div>
                    <Typography
                        variant={'h2'}
                        component={'h2'}
                        fontSize={20}
                        fontWeight={500}
                        color={'textSecondary'}
                        className={styles.description}
                    >
                        Descubra repositórios, explore código e conecte-se com desenvolvedores
                    </Typography>
                </div>
            </div>
        </div>
    );
}