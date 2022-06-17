import { useDispatch } from 'react-redux';
import { auth } from '../../features/user/userSlice'
import { useState } from 'react';

const RegistrationForm = () => {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const goRegister = async (event) => {
    event.preventDefault();

    const {
      username: { value: username },
      password: { value: password },
      email: { value: email },
      method,
    } = event.target

    const body = JSON.stringify({ username, password, email });

    const response = await fetch('http://localhost:3000/auth/register', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body,
      method
    });

    const user = await response.json();
    console.log(user);

    dispatch(auth(user));
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div>
      {
        isClicked ?
          <form action="/auth/register" onSubmit={goRegister} method="post">
            <label htmlFor="username">
              Username
              <input type="text" name="username" id="username" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" id="password" />
            </label>
            <label htmlFor="email">
              Email
              <input type="email" name="email" id="email" />
            </label>
            <button type="submit">Register</button>
          </form>
          :
          <button type='button' onClick={handleClick}>Register</button>
      }
    </div>
  );
};

export default RegistrationForm;
