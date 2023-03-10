const INITIAL_STATE = [];

/*Reducer for all bugs in the database
 * */
export const bugReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case "UPDATED_BUGS":
                state.forEach((bugsOnProject, index, array) => {
                    if (bugsOnProject[0] !== undefined && action.payload.projectID === bugsOnProject.project) {
                        array[index] = action.payload.bugs
                    }
                })
                return [...state]
            case "CREATED_BUGS":
                state.forEach((bugsOnProject, index, array) => {
                    if (bugsOnProject[0] !== undefined && action.payload.projectID === bugsOnProject.project) {
                        array[index] = action.payload.bugs
                    }
                })
                return [...state]
            case "DELETE_BUGS":
                state.forEach((bugsOnProject, index, array) => {
                    if (bugsOnProject[0] !== undefined && action.payload.projectID === bugsOnProject.project) {
                        const filtered = bugsOnProject.filter((cur, i, arr) => {
                            return cur._id !== action.payload.id;
                        })
                        array[index] = filtered;
                    }
                    
                })
                return [...state]
            case "BUGS":
                return [...state, ...action.payload]
            default:
                return state;
        }
    
}