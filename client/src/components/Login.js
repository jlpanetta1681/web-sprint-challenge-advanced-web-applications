import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

export default function Login(props) {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [login, setLogin] = useState({
		username: '',
		password: '',
	});

	// const history = useHistory();

	const handleChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('/api/login', login)
			.then((res) => {
				console.log(res);
				window.localStorage.setItem('token', res.data.payload);

				props.history.push('/api/bubblepage');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form className="forms-style" onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					label="username"
					placeholder="username"
					value={props.username}
					onChange={handleChange}
					className="input"
				/>
				<input
					type="text"
					name="password"
					label="password"
					placeholder="password"
					value={props.password}
					onChange={handleChange}
					className="input"
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
