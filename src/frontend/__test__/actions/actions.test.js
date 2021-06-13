import { setFavorite, setLogin } from '../../actions/actions';
import MovieMock from '../../__mocks__/moviesMock';

describe('Actions', () => {
	test('Set Favorite Action', () => {
		const expectedPayload = {
			type: 'SET__FAVORITE',
			payload: MovieMock,
		};

		expect(setFavorite(MovieMock)).toEqual(expectedPayload);
	});

	test('Set Login Action', () => {
		const mockUser = {
			email: 'whateverhere@gmail.com',
			password: 'secretPassword',
		};

		const expectedPayload = {
			type: 'LOGIN',
			payload: mockUser,
		};

		expect(setLogin(mockUser)).toEqual(expectedPayload);
	});
});
