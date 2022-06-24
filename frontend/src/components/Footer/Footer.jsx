import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import homeSvg from '../../img/svg/house.svg';
import showelSvg from '../../img/svg/showel.svg';
import bladesSvg from '../../img/svg/bladesLarge.svg';
import chatSvg from '../../img/svg/chat.svg';
import bookSvg from '../../img/svg/book.svg';

function Footer() {

  return (
    <footer>
      <nav>
        <ul className={styles.ul_footer}>
          <li className={styles.li}><Link to="/">
            <img alt={''} src={homeSvg} />
          </Link></li>

          <li className={styles.li}><Link to="/loot">
            <img alt={''} src={showelSvg} />
          </Link></li>

          <li className={styles.li}><Link to="/arena">
            <img alt={''} src={bladesSvg} />
          </Link></li>

          <li className={styles.li}><Link to="/qrcode">
            <img alt={''} src={bookSvg} />
          </Link></li>
        </ul>
      </nav>
    </footer >
  );
}

export default Footer;
