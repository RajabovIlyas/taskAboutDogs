import axios from 'axios';

const mainLocalUrl = 'http://localhost:5000/api';

const apiFetch = (url: string, options = {}) => {
    const apiUrl = mainLocalUrl + url;

    return axios(apiUrl, {
        ...options,
    }).then((result) => result.data);
};

export default apiFetch;
