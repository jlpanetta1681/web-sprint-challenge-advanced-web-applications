import React, {useState } from "react";
import axiosWithAuth from "../utils/AxiosWithAuth.js";

export default function Login(props) {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ login, setLogin] = useState({
    username: '',
    password: ''
  })
  const handleChange  = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('login', login)
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.dta.payload)

      props.history.push('/colors')
    })
    .catch(err => console.log(`login with axiosWithAuth error`, err.response ))
  }

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
                <button className="start">Login</button>
            </form>
    </>
  );
};


