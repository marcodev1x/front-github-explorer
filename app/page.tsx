import Header from '@/app/domain/header';
import SearchGithub from '@/app/domain/search-github';
import Layout from '@/components/layout';

export default function Home() {
    return (
        <>
            <Layout>
                <Header />
                <SearchGithub />
            </Layout>
        </>
    );
}
