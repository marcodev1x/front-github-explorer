'use client';

import React, { JSX, useCallback, useMemo } from 'react';

import Button from '@/components/button';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { TextField, Typography } from '@mui/material';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';

import styles from './search-github.module.css';


export default function SearchGithub(): JSX.Element {
    const [search, setSearch] = React.useState<string>('');
    const size = useSize();

    const api = useApi({
        url: 'https://api.github.com',
    });

    const { refetch: findProfile, isFetching, isError } = useQuery<never>({
        queryKey: ['findProfile', search],
        queryFn: async ({ queryKey }) => {
            const [, user] = queryKey;

            const response = await api.get<never>(`/users/${user}`, {
                params: {
                    q: 'react',
                },
            });

            return response.data;
        },
        enabled: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const commonOptions = useMemo(() => {
        return [
            '@marcodev1x',
            '@torvalds',
            '@vercel',
            '@onliseguros',
        ];
    }, []);

    const changeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        return setSearch(e?.target?.value);
    }, []);

    const handleSearchUser = useCallback((): Promise<QueryObserverResult> => {
        return findProfile();
    }, [findProfile]);

    const handleCommonUsers = useCallback((value: string) => {
        const removeAt = value.replace('@', '');

        return () => setSearch(removeAt);
    }, []);

    const isMobile = size ? (size.isMobile || size.isLowerMobile) : false;

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <TextField
                    variant={'filled'}
                    label={isMobile ? 'Procurar por desenvolvedores' : 'Procurar por repositórios, desenvolvedores ou empresas'}
                    value={search}
                    onChange={changeSearch}
                    fullWidth
                    className={styles.input}
                    error={isError}
                />
                <Button
                    icon={<SearchIcon />}
                    iconLocation={'right'}
                    gap={'2'}
                    variant={'contained'}
                    padronizedSize={'large'}
                    onClick={handleSearchUser}
                    loading={isFetching}
                    disabled={search === ''}
                    className={styles.button}
                >
                    Buscar
                </Button>
            </div>

            <div className={styles.suggestion}>
                <Typography
                    color={'textSecondary'}
                    fontSize={14}
                >
                    Tente:
                </Typography>
                {commonOptions.map((user) => (
                    <Button
                        key={user}
                        variant={'text'}
                        padronizedSize={'small'}
                        onClick={handleCommonUsers(user)}
                    >
                        {user}
                    </Button>
                ))}
            </div>
        </div>
    );
}