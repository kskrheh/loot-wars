import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import homeSvg from "../../img/svg/house.svg";
import showelSvg from "../../img/svg/showel.svg";
import bladesSvg from "../../img/svg/bladesLarge.svg";
import chatSvg from "../../img/svg/chat.svg";
import bookSvg from "../../img/svg/book.svg";

function Footer() {
  return (
    <footer>
      <nav>
        <ul className={styles.ul_footer}>
          <li className={styles.li}>
            <Link to="/">
              <div className={styles.colorites}>
                {" "}
                <img alt={""} src={homeSvg} />
              </div>
            </Link>
          </li>

          <li className={styles.li}>
            <Link to="/loot">
              <div className={styles.colorites}>
                <img alt={""} src={showelSvg} />
              </div>
            </Link>
          </li>

          <li className={styles.li}>
            <Link to="/arena">
              <div className={styles.colorites}>
                <img alt={""} src={bladesSvg} />
              </div>
            </Link>
          </li>

          {/*<li className={styles.li}><Link to="/telegram">*/}
          {/*  <img alt={''} src={chatSvg}/>*/}
          {/*</Link></li>*/}

          <li className={styles.li}>
            <Link to="/history">
              <div className={styles.colorites}>
                <img alt={""} src={bookSvg} />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
