import handleEndpoints from './handleEndpoints'

export const getAllUsers = handleEndpoints.getAll('users')

export default {
    getAllUsers
}