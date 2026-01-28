import React, { useCallback } from 'react';

import Button from '@/components/button';
import Card from '@/components/card';
import { Typography } from '@/components/typography';
import {
    Book,
    Star,
    CallSplit,
    ErrorOutline,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

import styles from './repositories.module.css';
import { RepositoryComponent } from './types/repositories-types';

export default function Repositories({
    repositories,
    isFetching,
    isError,
    page,
    setPage,
}: RepositoryComponent) {
    const perPage = 10;

    const goToRepository = useCallback((url: string) => {
        return () => window.open(url, '_blank');
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        return () => setPage(newPage);
    }, [setPage]);

    if (isFetching) return <CircularProgress />;
    if (isError) return <div>Erro ao carregar repositórios. Tente novamente.</div>;

    if (!repositories) {
        return (
            <div>
                <Typography
                    icon={<Book color="primary" />}
                    iconLocation="left"
                    gap="2"
                    color="textSecondary"
                    marginTop={4}
                >
                    Nenhum repositório encontrado ou não há mais repositórios.
                </Typography>
            </div>
        );
    }

    return (
        <>
            <Typography
                icon={<Book color="primary" />}
                iconLocation="left"
                gap="2"
                color="textSecondary"
                marginTop={4}
            >
                {repositories?.length} repositórios
            </Typography>

            <div className={styles.container}>
                {repositories?.map((repo) => {
                    if (repositories.length <= 0) return;

                    return (
                        <Card.WithEffect
                            key={repo.id}
                            className={styles.cardContent}
                            variant="outlined"
                            elevation={1}
                            onClick={goToRepository(repo.html_url)}
                        >
                            <div className={styles.cardTextIsolate}>
                                <div className={styles.cardTexts}>
                                    <Typography
                                        variant="h1"
                                        component="h1"
                                        fontSize={16}
                                        fontWeight={600}
                                        title={repo.name}
                                    >
                                        {repo.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        fontSize={14}
                                        fontWeight={400}
                                        color="textSecondary"
                                    >
                                        {repo.description || 'Sem descrição'}
                                    </Typography>
                                </div>

                                <div className={styles.repoStats}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        fontSize={12}
                                        fontWeight={500}
                                        color="textSecondary"
                                        icon={<Star fontSize="small" />}
                                        iconLocation="left"
                                    >
                                        {repo.stargazers_count || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        fontSize={12}
                                        fontWeight={500}
                                        color="textSecondary"
                                        icon={<CallSplit fontSize="small" />}
                                        iconLocation="left"
                                    >
                                        {repo.forks_count || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        fontSize={12}
                                        fontWeight={500}
                                        color="textSecondary"
                                        icon={<ErrorOutline fontSize="small" />}
                                        iconLocation="left"
                                    >
                                        {repo.open_issues_count || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        fontSize={12}
                                        fontWeight={500}
                                        color="textSecondary"
                                        icon={<Book fontSize="small" />}
                                        iconLocation="left"
                                    >
                                        {repo.language || 'Sem linguagem'}
                                    </Typography>
                                </div>
                            </div>
                        </Card.WithEffect>
                    )
                })}
            </div>

            <div className={styles.pagination}>
                <Button
                    padronizedSize={'small'}
                    onClick={handlePageChange(page - 1)}
                    disabled={page === 1 || isFetching}
                >
                    Anterior
                </Button>
                <span>Página {page}</span>
                <Button
                    padronizedSize={'small'}
                    onClick={handlePageChange(page + 1)}
                    disabled={repositories?.length < perPage || isFetching}
                >
                    Próxima
                </Button>
            </div>
        </>
    );
}
