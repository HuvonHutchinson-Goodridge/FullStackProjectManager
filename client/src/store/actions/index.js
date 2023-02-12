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


//BUGS
/**
 * 
 * @param values contains the bug string to be created
 * @param bugs contains the array of bugs for associated project
 */

export const createBug = (values, bugs) => {
    return async function (dispatch, getState) {
        try {
            const data = await API.createBugOnProject(values, "bugs")
            if (data.status === "success") {
            
                bugs.push(data.data.data)
                dispatch({
                    type: "BUGS",
                    payload: {
                        bugs,
                        projectID: values.projectID
                    }
                }
                )
            }
        } catch (err) {
            console.log(err)
        }
    }
}

/**
 * 
 * @param changes contains the status of the bug to be updated
 * @param bugs contains all of the bugs on the project
 * @param id contains the id of the bug
 */

export const updateBug = (id, changes, bugs) => {
    return async function (dispatch, getState) {
        try {
            const bugStatus = changes === "Pending" ? "Resolved" : "Pending";
            const data = await API.updateBug(id, { bugStatus })
            if (data.status === "success") {
                const updatedBug = data.data.data
                bugs.forEach((bug, index, array) => {
                    if (bug._id === id) {
                        array[index] = updatedBug
                    }
                })

                const projects = getState().projectReducer
                    projects.forEach((project) => {
                    if (project._id === bugs[0].project) {
                        if (updatedBug.bugStatus === "Pending") {
                            project.bugsPending += 1
                            project.bugsResolved -= 1;
                        } else {
                            project.bugsPending -= 1;
                            project.bugsResolved += 1;
                        }
                    }
                    })
                dispatch({
                    type: 'UPDATED_PROJECTS',
                    payload: projects
                })

                dispatch({
                    type: "UPDATED_BUGS",
                    payload: {
                        bugs,
                        projectID: bugs[0].project
                    }
                }
                )
            }
        } catch (err) {
            console.log(err);
        }
    }
}