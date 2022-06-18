import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {

  return (
    <footer>
      <nav>
        <ul className={styles.ul_footer}>
          <li><Link to="/">⛺</Link></li>
          <li><Link to="/loot">🪠</Link></li>
          <li><Link to="/arena">⚔</Link></li>
          <li><Link to="/telegram">✉</Link></li>
          <li><Link to="/history">📖</Link></li>
        </ul>
      </nav>
    </footer >
  );
}

export default Footer;
