const INITIAL_STATE = {};

/*Reducer for all bugs in the database
 * */
export const bugReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "UPDATED_BUGS":
            Object.assign(state[action.payload.projectID][action.payload.bugID], action.payload.bug);

            return { ...state }
        case "CREATED_BUGS":

            return { ...state, ...action.payload }
        case "DELETE_BUGS":
            delete state[action.payload.projectID][action.payload.bugID]
 
            return { ...state }
        case "BUGS":
            return { ...state, ...action.payload }
        default:
            return state;
    }

}