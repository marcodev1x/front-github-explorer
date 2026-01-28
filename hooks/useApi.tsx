import axios from 'axios';

function createApi(url: string) {
    return axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        },
    });
}

export default function useApi({
    url,
}: {
    url: string;
}) {
    return createApi(url);
}
