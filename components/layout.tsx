import React from 'react';

import NavigationContainer from '@/components/navigation-container';

import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={styles.main}>
            <NavigationContainer />
            {children}
        </main>
    );
}