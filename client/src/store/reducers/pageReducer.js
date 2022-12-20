const INITIAL_STATE = {
	title: '',
	subtitle: ''
}

export const pageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "PAGE":
			return { ...state, ...action.payload}
		default:
			return state;
	}
}

