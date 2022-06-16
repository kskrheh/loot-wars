import { useContext } from "react";
import AppContext from "../../context/AppContext";

const RegistrationForm = () => {
  const {dispatch} = useContext(AppContext);
  const goRegister = async (event) => {
    event.preventDefault();

    const {
      login: {value: login},
      password: {value: password},
      email: {value: email},
      method,
      action: url,
    } = event.target
    const body = JSON.stringify({login, password, email});
    const response = await fetch(url, {
      headers: {'Content-Type' : 'application/json'},
      credentials : 'include',
      body,
      method
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
      <form action="/auth/register" onSubmit={goRegister} method="post">
        <label htmlFor="login">
          <input type="text" name="login" id="login" />
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password"/>
        </label>
        <label htmlFor="email">
          <input type="email" name="email" id="email" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
