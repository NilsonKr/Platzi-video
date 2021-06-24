import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SetPlaying } from '../actions/actions';

import '../styles/components/Player.scss';

const MediaPlayer = props => {
	const { id } = props.match.params;

	useEffect(() => {
		props.SetPlaying(id);
	}, []);

	return (
		<>
			<div className='Player'>
				<video controls autoPlay>
					<source src={props.playing.source || ''} type='video/mp4' />
				</video>
				<div className='Player-back'>
					<button onClick={() => props.history.goBack()}>Go Back</button>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = state => ({
	playing: state.playing,
});

const mapDispatchToProps = {
	SetPlaying,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
