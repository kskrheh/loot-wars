import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const goLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('/auth/logout', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      removeCookie('user');
      dispatch(logout())
    }
  }

  return (
    <button onClick={goLogout}>
      EXIT
    </button>
  );
};

export default LogoutButton;
