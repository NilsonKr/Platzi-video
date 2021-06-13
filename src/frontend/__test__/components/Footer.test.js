import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
	const footerMounted = shallow(<Footer />);

	test('Footer exists', () => {
		expect(footerMounted.length).toEqual(1);
	});

	test('Footer have 3 anchors', () => {
		expect(footerMounted.find('a')).toHaveLength(3);
	});

	test('Footer SnapShot', () => {
		const footerSnap = create(<Footer />);

		expect(footerSnap.toJSON()).toMatchSnapshot();
	});
});
