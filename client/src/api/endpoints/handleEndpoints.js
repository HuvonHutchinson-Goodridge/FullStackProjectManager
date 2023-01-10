import axios from 'axios'

const headers = {
    headers: {
        "Content-type": "application/json"
    }
}
/**
 * Generalizable functions for api resources
 * @param resource contains the resource you are querying for
 * @param id contains the id of a specific resource
 * @param changes contains the data that will update a resource
 */

export const getAll = (resource) => async (id, auxiliary) => {
    let endpoint = (id && auxiliary) ?
        `/api/v1/${resource}/${id}/${auxiliary}`
        : `/api/v1/${resource}`;

    const { data } = await axios.get(endpoint, headers)
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

export const createOne = (resource) => async (values, auxiliary) => {
    console.log(values)
    let endpoint = (values.project && auxiliary) ?
        `/api/v1/${resource}/${values.project}/${auxiliary}`
        : `/api/v1/${resource}`;
    
    const { data } = await axios.post(endpoint, values, headers);
    return data;
}

export const deleteOne = (resource) => async (id) => {
    const data = await axios.delete(`/api/v1/${resource}/${id}`, headers)
    return data;
}

export default {
    getAll,
    getOne,
    updateOne,
    createOne,
    deleteOne
}