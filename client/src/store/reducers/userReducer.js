const INITIAL_STATE = [];

//Reducer for storing all of the users in the database

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "USERS":
            return [...state, ...action.payload];
        default:
            return state
    }
}