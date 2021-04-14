export default (state, action) => {
	switch (action.type) {
		case 'SET__FAVORITE':
			return { ...state, myList: [...state.myList, action.payload] };
			break;
		default:
			return state;
	}
};
