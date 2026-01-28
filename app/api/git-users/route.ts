import { NextResponse } from 'next/server';
import useApi from '@/hooks/useApi';

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

    const api = useApi({ url: 'https://api.github.com' });

    try {
        const res = await api.get(`/users/${user}`);

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
