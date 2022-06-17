import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice'

const LogoutButton = () => {
  const dispatch = useDispatch();

  const goLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/auth/logout', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (response.status === 200) {
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
