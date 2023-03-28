import API from './../../api/API'
import Cookies from 'js-cookie'

/**
 * @function LogIn logs the user in
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
 * @function selectProject selects a project to be displayed on the bug page.
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
        id, users } = details

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
            id,
            users
        }
    }
}


/**
 * @function LogOut removes the JWT from local storage
 * @param navigate directs you to the homepage
 */
export const LogOut = (navigate) => {

    return async function (dispatch) {
        try {
            const data = await API.logoutUser();
  
            if (data.status === "success") {
                Cookies.remove("JWT");
                navigate("/")
                dispatch({
                    type: "LOG_OUT"
                })
                window.location.reload();
            }
        }catch (err) {
            console.log(err);
        }
    }
    
}

/**
 * @function fetchPage creates the title and the subtitle for the header
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
            const allProjects = await API.getAllProjects();

            const bugs = {}
            const projects = {}

            allProjects.data.data.forEach((cur) => {
                const project = cur["_id"]
                bugs[project] = {}
                projects[project] = cur;
            })
            
            const users = await API.getAllUsers();
            const allBugs = await API.getAllBugs('bugs')
            
            allBugs.data.data.forEach((cur, i, arr) => {
                bugs[cur.project][cur._id] = cur;
            })
          
            dispatch({
                type: "BUGS",
                payload: bugs
            })
            dispatch({
                type: "PROJECTS",
                payload: projects
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
 * @function createBug adds a bug to the state and the backend database
 * @param values contains the bug string to be created
 * @param bugs contains the array of bugs for associated project
 */

export const createBug = (values, bugs) => {
    return async function (dispatch, getState) {
        try {
            if (values.bug.length > 1) {
                const data = await API.createBugOnProject(values, "bugs")
                if (data.status === "success") {

                    bugs.push(data.data.data)
                    dispatch({
                        type: "CREATED_BUGS",
                        payload: {
                            bugs,
                            projectID: values.project
                        }
                    }
                    )
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

/**
 * @function updateBug updates a bug in the backend and the state
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


/**
 * @function deleteBug deletes a bug from the backend and from the state
 * @param id contains the id of the bug
 */

export const deleteBug = (id, projectID) => {

    return async function (dispatch) {

        try {
            await API.deleteBug(id);

            dispatch({
                type: "DELETE_BUGS",
                payload: {
                    id,
                    projectID
                }
            })

        } catch(err) {
            console.err(err);
        }

    }
}