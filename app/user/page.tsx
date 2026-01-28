'use client';

import { useEffect, useState } from 'react';

import { store } from '@/app/helpers';
import Header from '@/app/user/domains/header';
import Repositories from '@/app/user/domains/repositories';
import Layout from '@/components/layout';
import useApi from '@/hooks/useApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';

import { Repository } from './domains/types/repositories-types';

export default function User() {
    const { user } = store((state) => state);
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const pathname = usePathname();

    const api = useApi({
        url: pathname.replace('/user', ''),
    });

    const perPage = 10;

    const { data, isFetching, isError } = useQuery<Repository[]>({
        queryKey: ['repositories', user?.login, page],
        queryFn: async () => {
            const res = await api.get<Repository[]>(
                `/api/git-repo?user=${user?.login}&page=${page}&per_page=${perPage}`,
            );
            return res.data;
        },
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60,
    });

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <Layout>
            <Header />
            <Repositories
                repositories={data}
                isFetching={isFetching}
                isError={isError}
                page={page}
                setPage={setPage}
            />
        </Layout>
    );
}