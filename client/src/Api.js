import axios from "axios";

export const getProfileApi = async (url) => {
    const res = await axios.get(url, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });
    return res;
};
export const updateProfile = async (url, user) => {
    const res = axios.post(url, user, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });
    return res;
};
export const searchApi = async (url) => {
    const res = await axios.get(url, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });
    return res;
};
export const addApi = async (url) => {
    const res = await axios.get(url, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });
    return res;
};
export const getListMessApi = async (url) => {
    const res = await axios.get(url, {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    });
    return res;
};
