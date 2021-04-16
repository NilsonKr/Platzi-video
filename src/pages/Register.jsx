import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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

		console.log(form);
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
						placeholder='Correo'
						name='email'
						value={form.email}
						onChange={handleSetValues}
					/>
					<input
						className='input--register'
						type='password'
						placeholder='Contraseña'
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

export default Register;
