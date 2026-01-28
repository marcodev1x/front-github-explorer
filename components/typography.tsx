import { JSX } from 'react';

import { setIconLocation } from '@/app/helpers';
import { TypographyNewProps } from '@/components/types/typography-types';
import { Typography as MuiTypography } from '@mui/material';

export function Typography({
    icon,
    iconLocation = 'left',
    gap = '1',
    children,
    ...props
}: TypographyNewProps): JSX.Element {
    return (
        <MuiTypography {...props}>
            {setIconLocation(iconLocation, icon, children, gap)}
        </MuiTypography>
    );
}