import React, { JSX } from 'react';

import { setIconLocation } from '@/app/helpers';
import { LinkNewProps } from '@/components/types/link-types';
import { Link as MuiLink } from '@mui/material';

import styles from './link.module.css';

export default function Link({
    href,
    target,
    rel,
    underline,
    children,
    icon,
    iconLocation = 'left',
    gap = '1',
    ...props
}: LinkNewProps): JSX.Element {
    return (
        <MuiLink
            href={href}
            target={target}
            rel={rel}
            underline={underline}
            className={styles.link}
            {...props}
        >
            {setIconLocation(iconLocation, icon, children, gap)}
        </MuiLink>
    );
}