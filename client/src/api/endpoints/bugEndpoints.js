import handleEndpoints from './handleEndpoints'

export const getAllBugs = handleEndpoints.getAll('bugs')
export const getBug = handleEndpoints.getOne('bugs')
export const updateBug = handleEndpoints.updateOne('bugs');
export const createBug = handleEndpoints.createOne('bugs');
export const deleteBug = handleEndpoints.deleteOne('bugs')

const bugEndpoints = {
    getAllBugs,
    getBug,
    updateBug,
    createBug,
    deleteBug
}

export default bugEndpoints