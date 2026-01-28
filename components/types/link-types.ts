import { LinkProps } from '@mui/material';
import React from 'react';
import { CommonGap, IconLocation } from '@/app/types/helpers-types';

export type LinkNewProps = {
    icon?: React.ReactNode;
    iconLocation?: IconLocation;
    gap?: CommonGap;
} & LinkProps;