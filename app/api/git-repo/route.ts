import { NextResponse } from 'next/server';
import apiInstance from '@/hooks/useApi';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');
    const page = searchParams.get('page');
    const perPage = searchParams.get('per_page');

    if (!user) {
        return NextResponse.json(
            { error: 'Parâmetro "user" é obrigatório' },
            { status: 400 }
        );
    }

    const api = apiInstance({ url: 'https://api.github.com', token: true });

    try {
        const res = await api.get(`/users/${user}/repos?page=${page}&per_page=${perPage}`);

        return NextResponse.json(res.data);
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 404) {
                return NextResponse.json(
                    { error: 'Usuário não encontrado' },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { error: 'Erro genérico, contate o suporte.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Erro ao conectar com a API do GitHub' },
            { status: 500 }
        );
    }
}
