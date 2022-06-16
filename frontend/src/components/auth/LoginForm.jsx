import { useContext } from "react";
import AppContext from "../../context/AppContext";

const LoginForm = () => {
  const {dispatch} = useContext(AppContext);

  const goLogin = async (event) => {
    event.preventDefault();

    const {
      login: {value: login},
      password: {value: password},
      method,
      action: url
    } = event.target;

    const body = JSON.stringify({login, password});
    const response = await fetch(url, {
      method,
      body,
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
    });
    
    const user = await response.json();
    console.log(user);
    const action = {
      type: 'AUTH_USER',
      payload: user,
    }

    dispatch(action);
  }
  return (
    <div>
      <form action="/auth/login" method="post" onSubmit={goLogin}>
        <label htmlFor="login">
          Login
        <input type="text" name="login" id="login" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password"/>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
