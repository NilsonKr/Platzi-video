import React from 'react';
import logo from '@assets/logo-platzi-video-BW2.png';
import userIcon from '@assets/user-icon.png';
import '@styles/components/Header.scss';

const Header = () => (
	<header className='header'>
		<img className='header__img' src={logo} alt='Platzi Video' />
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
					<a href='/'>Log Out</a>
				</li>
			</ul>
		</div>
	</header>
);

export default Header;
