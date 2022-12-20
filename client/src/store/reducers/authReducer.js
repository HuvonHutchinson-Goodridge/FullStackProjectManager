const INITIAL_STATE = {
	isSignedIn: false,
	firstName: null,
	lastName: null,
	email: null,
	role: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, ...action.payload, isSignedIn: true}
		case "LOG_OUT":
			return { ...state, isSignedIn: false };
		default:
			return state;
	}
}

