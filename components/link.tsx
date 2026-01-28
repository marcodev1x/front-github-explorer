import React, { JSX } from 'react';

import { Link as MuiLink, LinkProps } from '@mui/material';

import styles from './link.module.css';

export default function Link({
    href,
    target,
    rel,
    underline,
    children,
    ...props
}: LinkProps): JSX.Element {
    return (
        <MuiLink
            href={href}
            target={target}
            rel={rel}
            underline={underline}
            className={styles.link}
            {...props}
        >
            {children}
        </MuiLink>
    );
}