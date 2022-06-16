import { useDispatch } from 'react-redux';
import { auth } from '../../features/user/userSlice'
import { useCookies } from 'react-cookie';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);

  if (cookies) {
    dispatch(auth(cookies));
    // console.log(cookies.user.password);
  }

  const goRegister = async (event) => {
    event.preventDefault();

    const {
      login: { value: login },
      password: { value: password },
      email: { value: email },
      method,
    } = event.target
    console.log(login, email, password);
    const body = JSON.stringify({ login, password, email });
    const response = await fetch('/auth/register', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body,
      method
    });

    const user = await response.json();
    console.log(user);

    setCookie('user', user);
    dispatch(auth(cookies));
  }
  return (
    <div>
      <form action="/auth/register" onSubmit={goRegister} method="post">
        <label htmlFor="login">
          <input type="text" name="login" id="login" />
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password" />
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
