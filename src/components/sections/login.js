import React,{ useState} from 'react';
import '../../styles/login.css';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


export default function Login(){

    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault()

		// Perform actual login using backend API, authentication, etc.
		// Replace this with your specific implementation
		axios.post('http://localhost:3001/Login', { username, password })
		.then(result => {
			console.log(result)
			if(result.data === "Success") {
		navigate('/home')
			}
	})
		.catch(err=> console.log(err))

		// Assuming successful login, update error state and clear fields
		setUsername('');
		setPassword('');
		setError('');

		// You can redirect to a different page here based on your app's logic
		// window.location.href = '/dashboard'; // Example redirection
}


    return(
        <>
        <div className="sign-in-container">
			<img
				src="path/to/your/background_image.jpg"
				alt="Background"
				className="background-image"
			/>
			<form onSubmit={handleSubmit}>
				<h1>LOGIN</h1>

				<div className="input-field">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className="input-field">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{error && <div className="error-message">{error}</div>}

				<button type="submit" className="login-button">
					Sign In
				</button>
				<br></br>
				<p>Don't Have an Account?</p> <Link to="/signup">Signup</Link>
			</form>
			</div>
        </>
    );
}