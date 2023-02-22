import axios from 'axios';
/**
 * Registers a new user in the database
 * @param credentials contains email, firstName,lastName, password, confirmPassword
 */

export const register = async (credentials) => {
    const response = await axios.post("/api/v1/users/signup", credentials, {
        headers: {
            "Content-type": "application/json"
        }
    })
    return response
}

/**
 * Log in a user
 * @param credentials holds email and password
 */
 
export const loginUser = async (credentials) => {
    const { data } = await axios.post("/api/v1/users/login", credentials, {
        headers: {
            "Content-type": "application/json"
        }
    })
    return data;
}

/**
 * @function LogOut logs out a user
 */
export const logoutUser = async () => {
    const { data } = await axios.post("/api/v1/users/logout", {
        headers: {
            "Content-type": "application/json"
        }
    })
    return data
}

export default {
    loginUser,
    register,
    logoutUser,
}