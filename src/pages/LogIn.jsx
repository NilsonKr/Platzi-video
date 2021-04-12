import React from 'react';
import { Link } from 'react-router-dom';

import googleIcon from '../assets/google-icon.png';
import twitterIcon from '../assets/twitter-icon.png';
import '../styles/components/LogIn.scss';

const LogIn = () => {
	return (
		<section className='login'>
			<section className='login__container'>
				<h2>Inicia sesión</h2>
				<form className='login__container--form'>
					<input className='input--login' type='text' placeholder='Correo' />
					<input className='input--login' type='password' placeholder='Contraseña' />
					<button className='button'>Iniciar sesión</button>
					<div className='login__container--remember-me'>
						<label>
							<input type='checkbox' id='cbox1' value='first_checkbox' />
							Recuérdame
						</label>
						<a href='/'>Olvidé mi contraseña</a>
					</div>
				</form>
				<section className='login__container--social-media'>
					<div>
						<img src={twitterIcon} /> Inicia sesión con Google
					</div>
					<div>
						<img src={googleIcon} /> Inicia sesión con Twitter
					</div>
				</section>
				<p className='login__container--register'>
					No tienes ninguna cuenta <Link to='/register'>Regístrate</Link>
				</p>
			</section>
		</section>
	);
};

export default LogIn;
