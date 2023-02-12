const INITIAL_STATE = [];

/*Reducer for all bugs in the database
 * */
export const bugReducer = (state = INITIAL_STATE, action) => {
    if (action.payload?.bugs != undefined) {
        state.forEach((bugsOnProject, index, array) => {
            if (bugsOnProject[0] != undefined && action.payload.projectID === bugsOnProject.project) {
                array[index] = action.payload.bugs
        }
        }) 
        switch (action.type) {
            case "BUGS":
                return [...state]
            default:
                return state;
        }
    } else {
        switch (action.type) {
            case "BUGS":
                return [...state, ...action.payload]
            default:
                return state;
        }
    }
}