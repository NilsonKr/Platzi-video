import React from 'react';
import { mount } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import Login from '../../pages/LogIn';

describe('<Login />', () => {
	const loginMounted = mount(
		<ProviderMock>
			<Login />
		</ProviderMock>
	);

	test('Form Submit', () => {
		const preventDefault = jest.fn();

		loginMounted.find('form').simulate('submit', { preventDefault });

		expect(preventDefault).toHaveBeenCalledTimes(1);
	});

	test('Necessary Inputs', () => {
		expect(loginMounted.find('.input--login')).toHaveLength(2);
	});
});
