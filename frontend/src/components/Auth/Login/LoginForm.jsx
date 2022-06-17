import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../../features/user/userSlice'

const LoginForm = () => {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const goLogin = async (event) => {
    event.preventDefault();

    const {
      username: { value: username },
      password: { value: password },
      method,
    } = event.target;

    const body = JSON.stringify({ username, password });
    const response = await fetch('http://localhost:4000/auth/login', {
      method,
      body,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const user = await response.json();
    console.log(user)
    dispatch(login(user))
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div>
      {
        isClicked ?
          <form action="/auth/login" method="post" onSubmit={goLogin}>
            <label htmlFor="username">
              Username
              <input type="text" name="username" id="username" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" id="password" />
            </label>
            <button type="submit">Login</button>
          </form>
          :
          <button type="button" onClick={handleClick}>Login</button>
      }

    </div>
  );
};

export default LoginForm;
