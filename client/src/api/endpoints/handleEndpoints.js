import axios from 'axios'
export const getAll = (key) => {
    const { data } = axios.get(`/api/v1/${key}`, {
        headers: {
            "Content-type": "application/json"
        }
    })
    return data;
}

export default {getAll}