const INITIAL_STATE = [];

/*Reducer for all bugs in the database
 * */
export const bugReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "BUGS":
            return [...state, ...action.payload]
        default:
            return state;
    }
}