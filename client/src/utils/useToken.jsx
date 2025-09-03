import { useState } from 'react';

export const useToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    return token;
};