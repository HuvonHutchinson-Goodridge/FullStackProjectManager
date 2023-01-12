const INITIAL_STATE = [];

/*Reducer for all projects in the database
 * */
export const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "PROJECT":
            return [...state, ...action.payload]
        default:
            return state;
    }
}