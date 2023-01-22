import API from './../../api/API'

/**
 * 
 * @param  credentials responsible for the data from the form
 * @param  navigate navigates the dashboard upon successful login
 * @param  setFieldError responsible for creating red error text at bottom of input
 * @param  setSubmitting confirms the submission of farm
 */
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

/**
 * 
 * @param details of the project that was selected in the bugs component
 */

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

/**
 * 
 * @param title for the header
 * @param subtitle for the smaller title in the header
 */

export const fetchPage = (title, subtitle) => {
    return {
        type: "PAGE",
        payload: {
            title,
            subtitle
        }
    }
}

/**
 * @function loadData loads data from the API into the redux store
 * 
 * */

export const loadData = () => {
    return async function (dispatch) {
        try {
            const projects = await API.getAllProjects();
            const users = await API.getAllUsers();
            const bugsOnProject = projects.data.data.map(async (project) => {
                return await API.getAllProjects(project._id, 'bugs')
            })
            const bugs = await Promise.all(bugsOnProject).then(values => {
                const bugData = values.map((value) => {
                    return value.data.data
                })
                return bugData;
            })
          
            dispatch({
                type: "BUGS",
                payload: bugs
            })
            dispatch({
                type: "PROJECTS",
                payload: projects.data.data
            })
            dispatch({
                type: "USERS",
                payload: users.data.data
            })
            
        } catch (err) {
            console.log(err);
        }
    }
}
