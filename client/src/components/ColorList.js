import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth.js';

export default function Login(props) {
	const [login, setLogin] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('login', login)
			.then((res) => {
				console.log(res);
				localStorage.setItem('token', res.data.payload);
				props.history.push('/bubblepage');
			})
			.catch((err) =>
				console.log(`Login.js axiosWithAuth error:`, err.response)
			);
	};
	return (
		<div>
			
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
				<button type='submit'>submit</button>
			</form>
		</div>
	);
}
