import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@assets/logo-platzi-video-BW2.png';
import userIcon from '@assets/user-icon.png';
import '@styles/components/Header.scss';

const Header = () => (
	<header className='header'>
		<Link to='/'>
			<img className='header__img' src={logo} alt='Platzi Video' />
		</Link>
		<div className='header__menu'>
			<div className='header__menu--profile'>
				<img src={userIcon} alt='User' />
				<p>Profile</p>
			</div>
			<ul>
				<li>
					<a href='/'>Account</a>
				</li>
				<li>
					<Link to='/login'>Log In</Link>
				</li>
			</ul>
		</div>
	</header>
);

export default Header;
