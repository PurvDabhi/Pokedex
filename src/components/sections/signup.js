import React, { useState } from 'react';
import "../../styles/signup.css"
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


export default function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isTermsAgreed) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    // Perform actual signup using backend API, authentication, etc.
    // Replace this with your specific implementation
    axios.post('http://localhost:3001/signup', { username, password, confirmPassword, isTermsAgreed})
    .then(result => {
			console.log(result)
			if(result.data === "Success") {
    
		

			}
    })
    .catch(err=> console.log(err))
    window.alert("Account Created Successfully")
    navigate('/')
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setIsTermsAgreed(false);
    setError('');
  }


    return(
    <> 
    <div className="sign-up-container">
      <img src="" alt="Background" className="background-image" />
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>

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

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div className="terms-checkbox">
          <input
            type="checkbox"
            id="terms"
            checked={isTermsAgreed}
            onChange={(e) => setIsTermsAgreed(e.target.checked)}
            required
          />
          <pre className='check' htmlFor="terms">I agree to the terms and conditions.</pre>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">Sign Up</button>
        <br></br>
        <p>Already have an Account?</p> <Link to="/">Login</Link>
      </form>
    </div>
    </>
    );
  
}