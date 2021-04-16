import React from 'react';

import '../styles/components/Player.scss';

const MediaPlayer = props => {
	const { id } = props.match.params;

	return (
		<div className='Player'>
			<video controls autoPlay>
				<source src='' type='video/mp4' />
			</video>
			<div className='Player-back'>
				<button onClick={() => props.history.goBack()}>Go Back</button>
			</div>
		</div>
	);
};

export default MediaPlayer;
