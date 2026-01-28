import useClassNames from '@/hooks/useClassnames';
import { CardProps, Card as MuiCard  } from '@mui/material';

import styles from './card.module.css';

export default function Card({
    children,
    className,
    ...props
}: CardProps) {
    return (
        <MuiCard
            className={className}
            {...props}
        >
            {children}
        </MuiCard>
    );
}

Card.WithEffect = function CardWithEffect({
    children,
    className,
    ...props
}: CardProps) {
    const possibleClass = useClassNames([
        className && className,
        styles.cardWithEffect,
    ]);

    return (
        <Card
            className={possibleClass}
            {...props}
        >
            {children}
        </Card>
    );
};