export default (state, action) => {
	switch (action.type) {
		case 'SET__FAVORITE':
			const exists = state.myList.find(item => item.id === action.payload.id);
			if (exists) {
				alert('You already have this item in your List!');
				return state;
			} else {
				return { ...state, myList: [...state.myList, action.payload] };
			}
			break;
		case 'DELETE__FAVORITE':
			return {
				...state,
				//Let only the items who dont match with deleted id
				myList: state.myList.filter(item => item.id !== action.payload),
			};
			break;
		case 'LOGIN':
			return { ...state, user: action.payload };
			break;
		case 'LOGOUT':
			return { ...state, user: {} };
			break;
		case 'SET_PLAYING':
			return {
				...state,
				playing:
					state.trends.find(item => item.id === Number(action.payload)) ||
					state.originals.find(item => item.id === Number(action.payload)) ||
					[],
			};
			break;
		default:
			return state;
	}
};
