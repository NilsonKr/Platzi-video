// const url = 'https://es.gravatar.com/avatar/${email}?d=identicon';
import md5 from 'md5';

const gravatar = email => {
	const formatEmail = email.trim().toLowerCase();
	const hash = md5(formatEmail, { encoding: 'binary' });
	const url = `https://es.gravatar.com/avatar/${hash}?d=identicon`;

	return url;
};

export default gravatar;
