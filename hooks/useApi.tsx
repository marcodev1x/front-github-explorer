import axios from 'axios';

function createApi(url: string, token?: boolean) {
    return axios.create({
        baseURL: url,
        headers: {
            Authorization: token ? `Bearer ${process.env.GITHUB_API_TOKEN}` : '',
        },
    });
}

export default function setupApi({
    url,
    token,
}: {
    url: string;
    token?: boolean;
}) {
    return createApi(url, token);
}
