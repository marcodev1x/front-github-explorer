import { useEffect, useState } from 'react';

export default function useSize() {
    const [windowDimension, setWindowDimension] = useState<number>(0);

    useEffect(() => {
        setWindowDimension(window.innerWidth);
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowDimension(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!window) return;

    return {
        isLowerMobile: windowDimension <= 440,
        isMobile: windowDimension < 768 && windowDimension > 440,
        isTablet: windowDimension >= 768 && windowDimension <= 886,
        isDesktop: windowDimension >= 1024,
    };
}
