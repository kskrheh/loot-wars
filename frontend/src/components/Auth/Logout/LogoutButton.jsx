import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../features/user/userSlice'

import styles from './LogoutButton.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/auth/logout', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (response.status === 200) {
      dispatch(logout())
      navigate('/')
    }
  }

  return (
    <button className={styles.logout} onClick={goLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
