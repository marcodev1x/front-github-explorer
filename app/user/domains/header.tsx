import { useCallback, useMemo } from 'react';

import { store, validateExistence } from '@/app/helpers';
import Button from '@/components/button';
import Link from '@/components/link';
import { Typography } from '@/components/typography';
import { ArrowLeft, Link as LinkIcon, LocationOn, Work } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import Image from 'next/image';

import styles from './header.module.css';
import Card from '@/components/card';

export default function Header() {
    const { user } = store((state) => state);
    const theme = useTheme();

    const handleRollBack = useCallback(() => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }, []);

    const setupExistentParams = useMemo(() => {
        return [
            {
                value: user?.location,
                icon: <LocationOn />,
            },
            {
                value: user?.company,
                icon: <Work />,
            },
        ];
    }, [user]);

    const setupStats = useMemo(() => {
        return [
            {
                value: user?.public_repos,
                label: 'Repositórios públicos',
            },
            {
                value: user?.followers,
                label: 'Seguidores',
            },
            {
                value: user?.following,
                label: 'Seguindo',
            },
        ];
    }, [user]);

    return (
        <div className={styles.container}>
            <Button
                padronizedSize={'large'}
                icon={<ArrowLeft />}
                onClick={handleRollBack}
                className={styles.button}
            >
                Nova busca
            </Button>
            <Card.WithEffect
                variant={'outlined'}
                className={styles.card}
            >
                <div>
                    <div className={styles.content}>
                        <Image
                            src={user?.avatar_url as string}
                            alt={'Avatar do usuário'}
                            width={120}
                            height={120}
                            style={{
                                borderRadius: '50%',
                            }}
                        />
                        <div className={styles.texts}>
                            <Typography
                                variant={'h1'}
                                component={'h1'}
                                fontSize={56}
                                fontWeight={600}
                            >
                                {user?.name}
                            </Typography>
                            <Typography
                                variant={'h2'}
                                component={'h2'}
                                fontSize={20}
                                fontWeight={500}
                                color={'textSecondary'}
                            >
                                {`@${user?.login}`}
                            </Typography>
                            <div className={styles.bio}>
                                {
                                    validateExistence(user?.bio, (
                                        <Typography
                                            variant={'h2'}
                                            component={'h2'}
                                            fontSize={20}
                                            fontWeight={500}
                                            color={'textSecondary'}
                                        >
                                            {user?.bio}
                                        </Typography>
                                    ))
                                }
                            </div>
                            <div className={styles.textsContent}>
                                {setupExistentParams.map((param, index) => {
                                    return validateExistence(param.value, (
                                        <Typography
                                            variant={'h2'}
                                            component={'h2'}
                                            fontSize={20}
                                            fontWeight={500}
                                            color={'textSecondary'}
                                            icon={param.icon}
                                            iconLocation={'left'}
                                        >
                                            {param.value}
                                        </Typography>
                                    ), String(index));
                                })}
                                {
                                    validateExistence(user?.blog, (
                                        <Link
                                            href={user?.blog as string}
                                            target={'_blank'}
                                            color={theme.palette.primary.main}
                                            icon={<LinkIcon />}
                                            iconLocation={'left'}
                                        >
                                            {user?.blog}
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className={styles.stats}>
                                {setupStats.map((stat, index) => {
                                    return (
                                        <div
                                            key={index}
                                        >
                                            <Typography
                                                variant={'h2'}
                                                component={'h2'}
                                                fontSize={32}
                                                fontWeight={600}
                                                color={theme.palette.primary.main}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                variant={'h2'}
                                                component={'h2'}
                                                fontSize={20}
                                                fontWeight={500}
                                                color={'textSecondary'}
                                            >
                                                {stat.label}
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Card.WithEffect>
        </div>
    );
}