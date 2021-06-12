import React, { useEffect } from 'react';

import '../styles/components/socialLogin.scss';

const LoginSocialMedia = () => {
	useEffect(() => {
		setTimeout(() => {
			window.close();
		}, 1000);
	}, []);

	return (
		<>
			<div className='social--callback'>
				<h2>Login Succesful</h2>
			</div>
		</>
	);
};

export default LoginSocialMedia;
