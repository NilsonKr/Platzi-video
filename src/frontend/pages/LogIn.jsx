import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogin } from '../actions/actions';

const LogIn = props => {
	const [form, setForm] = useState({
		user: '',
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
		props.setLogin({ email: form.user, password: form.password });

		props.history.push('/');
	};

	return (
		<section className='login'>
			<section className='login__container'>
				<h2>Inicia sesión</h2>
				<form className='login__container--form' onSubmit={handleSubmit}>
					<input
						name='user'
						className='input--login'
						type='text'
						placeholder='Correo'
						onChange={handleSetForm}
						value={form.user}
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
						<img src='assets/google-icon.png' /> Inicia sesión con Google
					</div>
					<div>
						<img src='assets/twitter-icon.png' /> Inicia sesión con Twitter
					</div>
				</section>
				<p className='login__container--register'>
					No tienes ninguna cuenta <Link to='/register'>Regístrate</Link>
				</p>
			</section>
		</section>
	);
};

const mapDispatchToProps = {
	setLogin,
};

export default connect(null, mapDispatchToProps)(LogIn);
