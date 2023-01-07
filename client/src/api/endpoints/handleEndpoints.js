import axios from 'axios'


const headers = {
    headers: {
        "Content-type": "application/json"
    }
}

export const getAll = (resource) => async () => {
    const { data } = await axios.get(`/api/v1/${resource}`, headers)
    return data;
}

export const getOne = (resource) => async (id) => {
    const { data } = await axios.get(`/api/v1/${resource}/${id}`, headers)
    return data;
}

export const updateOne = (resource) => async (id, changes) => {
    const { data } = await axios.patch(`/api/v1/${resource}/${id}`, changes, headers)
    return data;
}

export const createOne = (resource) => async (values) => {
    const { data } = await axios.post(`/api/v1/${resource}`, values);
    return data;
}

export const deleteOne = (resource) => async (id) => {
    const data = await axios.delete(`/api/v1/${resource}/${id}`)
    return data;
}

export default {
    getAll,
    getOne,
    updateOne,
    createOne,
    deleteOne
}