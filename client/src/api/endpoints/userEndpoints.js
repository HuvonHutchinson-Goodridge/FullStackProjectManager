import handleEndpoints from './handleEndpoints'

export const getAllUsers = handleEndpoints.getAll('users')
export const getUser = handleEndpoints.getOne('users');
export const updateUser = handleEndpoints.updateOne('users');
export const deleteUser = handleEndpoints.deleteOne('users')

const userEndpoints = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}

export default userEndpoints;