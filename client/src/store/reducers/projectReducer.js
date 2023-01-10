const INITIAL_STATE = {
    name: '',
    numOfUsers: 0,
    numOfBugs: 0,
    bugsPending: 0,
    bugsResolved: 0,
    description: '',
    image: '',
    id: ''
}

export const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PROJECT_SELECTED':
            return { ...state, ...action.payload }
        default:
            return state
    }
}