import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogOut } from '../actions/actions';
import gravatar from '../utils/gravatar';
import classNames from 'classnames';

import '../styles/components/Header.scss';

const Header = props => {
	const hasUser = Object.keys(props.user).length > 0;

	const classHeader = classNames('header', [`header--${props.bg}`]);

	return (
		<>
			<header className={classHeader}>
				<Link to='/'>
					<img className='header__img' src='assets/logo-platzi-video-BW2.png' alt='Platzi Video' />
				</Link>
				<div className='header__menu'>
					<div className='header__menu--profile'>
						<img src={hasUser ? gravatar(props.user.email) : 'assets/user-icon.png'} alt='User' />
						<p>{props.user.name || 'Profile'}</p>
					</div>
					<ul>
						{hasUser ? (
							<li>
								<Link to='/login'>Account</Link>
							</li>
						) : null}
						{hasUser ? (
							<li onClick={props.handleLogOut}>
								<a>Log Out</a>
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
	handleLogOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
