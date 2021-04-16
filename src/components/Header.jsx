import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';
import gravatar from '../utils/gravatar';

import logo from '@assets/logo-platzi-video-BW2.png';
import userIcon from '@assets/user-icon.png';
import '@styles/components/Header.scss';

const Header = props => {
	const hasUser = Object.keys(props.user).length > 0;

	return (
		<header className='header'>
			<Link to='/'>
				<img className='header__img' src={logo} alt='Platzi Video' />
			</Link>
			<div className='header__menu'>
				<div className='header__menu--profile'>
					<img src={hasUser ? gravatar(props.user.email) : userIcon} alt='User' />
					<p>Profile</p>
				</div>
				<ul>
					{hasUser ? (
						<li>
							<a href='/'>Account</a>
						</li>
					) : null}

					{hasUser ? (
						<li onClick={props.logOut}>
							<Link to='/login'>Log Out</Link>
						</li>
					) : (
						<li>
							<Link to='/login'>Log In</Link>
						</li>
					)}
				</ul>
			</div>
		</header>
	);
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
	logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
