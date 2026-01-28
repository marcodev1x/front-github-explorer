'use client';

import { JSX } from 'react';

import Link from '@/components/link';
import { GitHub } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import styles from './navigation-container.module.css';


export default function NavigationContainer(): JSX.Element {
    return (
        <div>
            <Box>
                <AppBar
                    position='static'
                    elevation={0}
                    color={'default'}
                    title={'GitOnli'}
                    className={styles.container}
                >
                    <Toolbar
                        className={styles.toolbar}
                    >
                        <div className={styles.leftToolbar}>
                            <IconButton
                                popover={'hint'}
                                size={'medium'}
                                className={styles.iconButton}
                            >
                                <GitHub
                                    color={'primary'}
                                />
                            </IconButton>
                            <Typography
                                variant={'h1'}
                                component={'div'}
                                fontSize={16}
                                fontWeight={600}
                                color={'textPrimary'}
                            >
                                GitExplorer
                            </Typography>
                        </div>
                        <div>
                            <Link
                                href={'https://github.com'}
                                color={'textPrimary'}
                                target={'_blank'}
                                rel={'noopener noreferrer'}
                                underline={'none'}
                                fontSize={16}
                            >
                                github.com
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}