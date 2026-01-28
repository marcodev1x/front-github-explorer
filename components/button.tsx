import { setIconLocation } from '@/app/helpers';
import { ButtonNewProps } from '@/components/types/ButtonTypes';
import useClassNames from '@/hooks/useClassnames';
import { Button as MuiButton, CircularProgress } from '@mui/material';

import styles from './button.module.css';

export default function Button({
    children,
    loading,
    icon,
    iconLocation = 'left',
    gap = '1',
    padronizedSize,
    className,
    ...props
}: ButtonNewProps) {
    const possibleClass = useClassNames([
        className,
        padronizedSize === 'large' && styles.large,
        padronizedSize === 'medium' && styles.medium,
        padronizedSize === 'small' && styles.small,
    ]);

    const booleanLoading = Boolean(loading);

    return (
        <MuiButton
            className={`${styles.button} ${possibleClass}`}
            disableTouchRipple={booleanLoading}
            disabled={booleanLoading}
            {...props}
        >
            <span
                className={`${styles.content} ${loading ? styles.hidden : ''}`}
            >
                {setIconLocation(iconLocation, icon, children, gap)}
            </span>
            
            {loading && (
                <span className={styles.spinnerWrapper}>
                    <CircularProgress size={16} color="inherit" />
                </span>
            )}
        </MuiButton>
    );
}