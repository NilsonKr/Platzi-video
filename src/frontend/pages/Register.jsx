import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../actions/actions';

const Register = props => {
	const [form, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	//Set Info
	const handleSetValues = ev => {
		setValues({
			...form,
			[ev.target.name]: ev.target.value,
		});
	};

	const handleSubmit = ev => {
		ev.preventDefault();

		props.registerUser(form, '/login');
	};

	return (
		<section className='register'>
			<section className='register__container'>
				<h2>Regístrate</h2>
				<form className='register__container--form' onSubmit={handleSubmit}>
					<input
						className='input--register'
						type='text'
						placeholder='Name'
						name='name'
						value={form.name}
						onChange={handleSetValues}
					/>
					<input
						className='input--register'
						type='text'
						placeholder='E-mail'
						name='email'
						value={form.email}
						onChange={handleSetValues}
					/>
					<input
						className='input--register'
						type='password'
						placeholder='Password'
						name='password'
						value={form.password}
						onChange={handleSetValues}
					/>
					<button className='button'>Registrarme</button>
				</form>
				<Link to='/login'>Iniciar sesión</Link>
			</section>
		</section>
	);
};

const mapDispatchToProps = {
	registerUser,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, mapDispatchToProps)(Register);
