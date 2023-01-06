import axios from 'axios';
/**
 * Registers a new user in the database
 * @param credentials contains email, firstName,lastName, password, confirmPassword
 * @param setFieldError responsible for setting errors on incorrect fields
 * @param setSubmitting responsebile for verifying if fields are to be submitted
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
 * @param dispatch contains dispatch function to send actions to redux store to update login status
 */
export const loginUser = async (credentials) => {
    const { data } = await axios.post("/api/v1/users/login", credentials, {
        headers: {
            "Content-type": "application/json"
        }
    })
    return data;
}

export default {
    loginUser,
    register
}