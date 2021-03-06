import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, socialLogin } from '../actions/actions';

import Header from '../components/Header';
import Loader from '../components/Loader';

const LogIn = props => {
	const [rememberMe, setRemember] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	//Set Query
	const handleSetForm = ev => {
		setForm({
			...form,
			[ev.target.name]: ev.target.value,
		});
	};

	const handleSubmit = ev => {
		ev.preventDefault();
		props.loginUser(form, '/', rememberMe);
	};

	//Login with Google
	const handleMediaLogin = socialMedia => {
		const authGoogle = window.open(`/social/${socialMedia}-oauth`, '_blank', 'width=500,height=600');

		const checkTimer = setInterval(() => {
			if (authGoogle.closed) {
				clearInterval(checkTimer);
				props.socialLogin(rememberMe);
			}
		}, 1000);
	};
	return (
		<>
			<Header bg='green' />
			<section className='login'>
				<section className='login__container'>
					<h2>Sign in</h2>
					<form className='login__container--form' onSubmit={handleSubmit}>
						<input
							name='email'
							className='input--login'
							type='text'
							placeholder='Correo'
							onChange={handleSetForm}
							value={form.email}
							autoComplete='true'
						/>
						<input
							name='password'
							className='input--login'
							type='password'
							placeholder='Contraseña'
							onChange={handleSetForm}
							value={form.password}
							autoComplete='true'
						/>
						<button className='button' type='submit'>
							Sign In
						</button>
						{props.error && <p className='login--error'>{props.error}</p>}
						<div className='login__container--remember-me'>
							<label>
								<input
									type='checkbox'
									id='cbox1'
									value='first_checkbox'
									onClick={() => setRemember(!rememberMe)}
								/>
								Remember Me
							</label>
							<a href='/'>Olvidé mi contraseña</a>
						</div>
					</form>
					<section className='login__container--social-media'>
						<div onClick={() => handleMediaLogin('google')}>
							<img src='assets/google-icon.png' /> Sign in with Google
						</div>
						<div onClick={() => handleMediaLogin('twitter')}>
							<img src='assets/twitter-icon.png' /> Sign in with Twitter
						</div>
					</section>
					<p className='login__container--register'>
						You don't have any Account yet ? <Link to='/register'>Sign Up</Link>
					</p>
				</section>
				{props.loading && <Loader />}
			</section>
		</>
	);
};

const mapDispatchToProps = {
	loginUser,
	socialLogin,
};

const mapStateToProps = ({ user, error, loading }) => ({ user, error, loading });

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
