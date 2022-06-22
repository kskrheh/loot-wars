import { useDispatch, useSelector } from 'react-redux';
import { isTimer } from '../../features/user/userSlice';
import LogoutButton from '../Auth/Logout/LogoutButton';
import styles from './Nav.module.css'
function Nav() {
  const user = useSelector((state) => state.user.user);
  const energy = useSelector((state) => state.user.user.energy);
  const time = useSelector((state) => state.user.user.time);

  const dispatch = useDispatch();

  let ATK;
  let DEF;
  if (user.weapons.length !== 0) {
    ATK = user.weapons.reduce((sum, weapon) => sum + weapon.ATK, 0)
    DEF = user.weapons.reduce((sum, weapon) => sum + weapon.DEF, 0)
  }

  if (energy === 20) {
    dispatch(isTimer(false));
  }

  return (
    <header>
      <div className={styles.container}>
        <div>⚔{ATK ?? 0}</div>
        <div>🛡{DEF ?? 0}</div>
        <div>⚡{user.energy} energy gain in :{user.energy < 20 && time}</div>
        <LogoutButton />
      </div>
    </header>
  );
}
export default Nav;
