import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login2 } from '../../features/user/userSlice'

const LoginForm = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);

  const goLogin = async (event) => {
    event.preventDefault();

    const {
      login: { value: login },
      password: { value: password },
      method,
    } = event.target;

    const body = JSON.stringify({ login, password });
    const response = await fetch('/auth/login', {
      method,
      body,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const user = await response.json();
    console.log(user);
    setCookie('user', user)
    dispatch(login2(cookies))
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
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
