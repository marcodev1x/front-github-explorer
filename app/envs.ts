const { NEXT_PUBLIC_GITHUB_API_URL } = process.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GITHUB_API_URL: String(NEXT_PUBLIC_GITHUB_API_URL),
}