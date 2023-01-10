import axios from 'axios';
import API from './../../api/API'

export const ADD = () => {
    return {
        type: "ADD_TEN",
        payload: 0,
    }
}

export const LogIn = (credentials, navigate, setFieldError, setSubmitting) => {
    //Make checks and get some data
    return async function (dispatch) {
        try {
            const data = await API.loginUser(credentials);
            if (data.status === "success") {
                dispatch({
                    type: "LOG_IN",
                    payload: {
                        id: data.data.user._id,
                        firstName: data.data.user.firstName,
                        lastName: data.data.user.lastName,
                        email: data.data.user.email,
                        role: data.data.user.role
                    }
                })
                navigate("/dashboard")
            }
            setSubmitting(true);
        } catch (err) {
            console.log(err);
            setFieldError("email", err.response.data.message)
            setFieldError("password", err.response.data.message)
            setSubmitting(false);
        }
    }
}

export const selectProject = (details) => {
    const { name,
        image,
        numOfBugs, 
        numOfUsers, 
        bugsPending, 
        bugsResolved, 
        description, 
        id } = details

    return {
        type: "PROJECT_SELECTED",
        payload: {
            name,
            numOfUsers,
            numOfBugs,
            bugsPending,
            bugsResolved,
            description,
            image,
            id
        }
    }
}

export const LogOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export const fetchUserData = ({ email, password }) => {

    return async function (dispatch, getState) {
        try {
            const { data } = await axios.get("/api/v1/users", { email, password },
                {
                    headers: { "Content-type": "application/json" }
                }
            )
            console.log(data);
            if (data.status === "success") {
                dispatch({
                    type: "USER_DATA",
                    payload: {}
                })
            }
        } catch (err) {
            console.log(err);
            throw Error(err.response.data.message);
        }
    }
}

export const fetchPage = (title, subtitle) => {
    return {
        type: "PAGE",
        payload: {
            title,
            subtitle
        }
    }
}
