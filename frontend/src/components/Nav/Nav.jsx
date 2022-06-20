import LogoutButton from '../Auth/Logout/LogoutButton';
import styles from './Nav.module.css'

function Nav() {

  return (
    <header>
      <div className={styles.container}>
        <div>⚔</div>
        <div>🛡</div>
        <div>⚡</div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Nav;
