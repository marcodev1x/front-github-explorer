import { ButtonProps } from '@mui/material';
import React from 'react';
import { CommonGap, IconLocation } from '@/app/types/helpers-types';

export type ButtonNewProps = {
    icon?: React.ReactNode;
    iconLocation?: IconLocation;
    gap?: CommonGap;
    padronizedSize: 'large' | 'medium' | 'small';
} & ButtonProps;