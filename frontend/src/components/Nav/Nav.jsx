import { useSelector } from 'react-redux';
import LogoutButton from '../Auth/Logout/LogoutButton';
import styles from './Nav.module.css'
function Nav() {
  const user = useSelector((state) => state.user.user);
  const time = useSelector((state) => state.user.user.time);

  let ATK;
  let DEF;
  if (user.weapons.length !== 0) {
    ATK = user.weapons.reduce((sum, weapon) => sum + weapon.ATK, 0)
    DEF = user.weapons.reduce((sum, weapon) => sum + weapon.DEF, 0)
  }

  return (
    <header>
      <div className={styles.container}>
        <div>⚔{ATK ?? 0}</div>
        <div>🛡{DEF ?? 0}</div>
        <div>⚡{user.energy} {user.energy < 20 && `energy gain in ${time}`}</div>
        <LogoutButton />
      </div>
    </header>
  );
}
export default Nav;
