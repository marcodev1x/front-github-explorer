'use client';

import React, { JSX, useCallback, useMemo } from 'react';

import { GitUser } from '@/app/domain/types/search-github.types';
import { store } from '@/app/helpers';
import Button from '@/components/button';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { Alert, Snackbar, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';

import styles from './search-github.module.css';


export default function SearchGithub(): JSX.Element {
    const [search, setSearch] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);

    const size = useSize();
    const { setLastUser } = store((state) => state);
    const router = useRouter();
    const pathname = usePathname();

    const api = useApi({
        url: pathname,
    });

    const { mutate: findProfile, isPending: isFetching, isError } = useMutation({
        mutationFn: async (user: string) => {
            const response = await api.get<GitUser>(`/api/git-users?user=${user}`);

            return response.data;
        },
        onSuccess: (data) => {
            setLastUser(data);

            router.push('/user');
        },
        onError: () => {
            setOpen(true);
        },
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

    const handleSearchUser = useCallback((user: string) => {
        return () => findProfile(user);
    }, [findProfile]);

    const handleCommonUsers = useCallback((value: string) => {
        const removeAt = value.replace('@', '');

        return () => setSearch(removeAt);
    }, []);

    const handleSnackbar = useCallback((value: boolean) => {
        return () => setOpen(value);
    }, []);

    const isMobile = size ? (size.isMobile || size.isLowerMobile) : false;

    return (
        <div className={styles.container}>
            <Snackbar
                open={isError && open}
                autoHideDuration={6000}
                onClose={handleSnackbar(false)}
                message="Usuário não encontrado. Tente novamente ou tente outro usuário."
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    onClose={handleSnackbar(false)}
                    variant="filled"
                >
                    Usuário não encontrado. Tente novamente.
                </Alert>
            </Snackbar>
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
                    onClick={handleSearchUser(search)}
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