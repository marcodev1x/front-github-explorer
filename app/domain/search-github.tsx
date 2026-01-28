'use client';

import React, { JSX, useCallback, useMemo } from 'react';

import { GitUser } from '@/app/domain/types/search-github.types';
import { store } from '@/app/helpers';
import Button from '@/components/button';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { TextField, Typography } from '@mui/material';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';

import styles from './search-github.module.css';


export default function SearchGithub(): JSX.Element {
    const [search, setSearch] = React.useState<string>('');
    const size = useSize();
    const { setLastUser } = store((state) => state);
    const router = useRouter();
    const pathname = usePathname();

    const api = useApi({
        url: pathname,
    });

    const { refetch: findProfile, isFetching, isError } = useQuery<GitUser>({
        queryKey: ['findProfile', search],
        queryFn: async ({ queryKey }) => {
            const [, user] = queryKey;

            const response = await api.get<GitUser>(`/api/git-users?user=${user}`, {
                params: {
                    q: 'react',
                },
            });

            setLastUser(response?.data);
            router.push('/user');

            return response?.data;
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