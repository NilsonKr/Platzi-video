import gravatar from '../../utils/gravatar';

test('Gravatar util', () => {
	const email = 'nuotrok444@gmail.com';
	const expectUrl = 'https://es.gravatar.com/avatar/66347041623742d4f5b27035d97dff42?d=identicon';

	expect(gravatar(email)).toEqual(expectUrl);
});
