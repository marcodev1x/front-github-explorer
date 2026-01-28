import { TypographyProps } from '@mui/material';
import React from 'react';
import { CommonGap, IconLocation } from '@/app/types/helpers-types';

export type TypographyNewProps = {
    icon?: React.ReactNode;
    iconLocation?: IconLocation;
    gap?: CommonGap;
} & TypographyProps;