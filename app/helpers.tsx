import React from 'react';

import { CommonGap, IconLocation } from '@/app/types/helpers-types';

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
        <div className={`flex items-center ${gapClasses[gap] || 'gap-2'}`}>
            {(position === 'left' || !position) && icon}
            {text}
            {position === 'right' && icon}
        </div>
    );
}