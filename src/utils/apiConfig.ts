export const getApiUrl = () => {
    if (typeof window === 'undefined') {
        return "https://skill-bridge-server-two.vercel.app/api";
    }
    return "/server";
};