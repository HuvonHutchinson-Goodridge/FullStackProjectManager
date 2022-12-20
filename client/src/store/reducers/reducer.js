const initialState = {
    count: 0,
}

export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TEN":
            return { ...state, count: state.count + 10 }

        default:
            return state;
    }
}
