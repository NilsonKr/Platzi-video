import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/actions';
import gravatar from '../utils/gravatar';
import classNames from 'classnames';

import '../styles/components/Header.scss';

const Header = props => {
	const hasUser = Object.keys(props.user).length > 0;
	const section = useLocation().pathname.split('/')[1];

	const classHeader = classNames('header', [`header--${section}`]);

	return (
		<>
			<header className={classHeader}>
				<Link to='/'>
					<img
						className='header__img'
						src='assets/logo-platzi-video-BW2.png'
						alt='Platzi Video'
					/>
				</Link>
				<div className='header__menu'>
					<div className='header__menu--profile'>
						<img
							src={hasUser ? gravatar(props.user.email) : 'assets/user-icon.png'}
							alt='User'
						/>
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
		</>
	);
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
	logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
