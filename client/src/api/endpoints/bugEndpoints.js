import handleEndpoints from './handleEndpoints'

export const getAllBugs = handleEndpoints.getAll('bugs')

export default {
    getAllBugs
}