import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Header from '../../components/Header';
import ProviderMock from '../../__mocks__/providerMock';

describe('<Header />', () => {
	const headerMounted = mount(
		<ProviderMock>
			<Header />
		</ProviderMock>
	);

	test('Header Logo Image', () => {
		expect(headerMounted.find('.header__img')).toHaveLength(1);
	});

	test('Header Snapshot', () => {
		const headerSnap = create(
			<ProviderMock>
				<Header />
			</ProviderMock>
		);

		expect(headerSnap.toJSON()).toMatchSnapshot();
	});
});
