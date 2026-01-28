import axios from 'axios';

function createApi(url: string) {
    return axios.create({
        baseURL: url,
    });
}

export default function useApi({
    url,
}: {
    url: string;
}) {
    return createApi(url);
}
