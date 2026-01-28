import React from 'react';

import { lastUserResource } from '@/app/store/last-user';
import { CommonGap, IconLocation, ZustandStoreOptions } from '@/app/types/helpers-types';
import { create } from 'zustand';

export function setIconLocation(position: IconLocation, icon: React.ReactNode, text: React.ReactNode, gap: CommonGap) {
    if (!icon) return text;

    const gapClasses = {
        '1': 'gap-1',
        '1.5': 'gap-1.5',
        '2': 'gap-2',
        '2.5': 'gap-2.5',
        '4': 'gap-4',
        '8': 'gap-8',
        '16': 'gap-16',
    };
    
    return (
        <span className={`flex items-center ${gapClasses[gap] || 'gap-2'}`}>
            {(position === 'left' || !position) && icon}
            {text}
            {position === 'right' && icon}
        </span>
    );
}

export const store = create<ZustandStoreOptions>((set, getState, store) => ({
    ...lastUserResource(set, getState, store),
}));

export function validateExistence(value: unknown, element: React.ReactNode, key?: string) {
    if (value) return <span key={key}>{element}</span>;

    return null;
}