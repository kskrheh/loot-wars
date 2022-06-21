import { useSelector } from 'react-redux';
import LogoutButton from '../Auth/Logout/LogoutButton';
import styles from './Nav.module.css'

function Nav() {
  const user = useSelector((state) => state.user.user);
  const ATK = user.weapons.reduce((sum, weapon) => sum + weapon.ATK, 0)
  const DEF = user.weapons.reduce((sum, weapon) => sum + weapon.DEF, 0)

  return (
    <header>
      <div className={styles.container}>
        <div>⚔{ATK}</div>
        <div>🛡{DEF}</div>
        <div>⚡{user.energy}</div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Nav;
