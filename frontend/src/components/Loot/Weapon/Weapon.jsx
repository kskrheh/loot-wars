import styles from "./Weapon.module.css";
import bladesSvg from "../../../img/svg/bladesBlack.svg";
import shieldSvg from "../../../img/svg/shieldBlack.svg";
function Weapon({ weapon, handleLi, pertain, ind }) {
  return (
    <>
      {
      weapon.title !== 'No item' ? (
        <li
      data-pertain={pertain}
      id={weapon.id}
      data-ind={ind}
      className={
        weapon.pick === 2
          ? `${styles.li_weapon} ${styles.pickOnUserWeapon}`
          : weapon.pick === 3
          ? `${styles.li_weapon} ${styles.pickOnLoot}`
          : `${styles.li_weapon} ${styles.pickOff}`
      }
      onClick={handleLi}
    >
          {weapon.title}
          <span>
            <img className={styles.svgIcon} alt={''}
               src={bladesSvg}/> {weapon.ATK}
          </span>
          <span>
            <img className={styles.svgIcon} alt={''}
               src={shieldSvg}/> {weapon.DEF}
          </span>
          <span>
            {' '}Q {weapon.quality}
          </span>
        </li>
      ) : (
        <li
      data-pertain={pertain}
      id={weapon.id}
      data-ind={ind}
      className={
        weapon.pick === 2
            ? `${styles.li_weapon} ${styles.pickOnUserWeapon}`
            : weapon.pick === 3
            ? `${styles.li_weapon} ${styles.pickOnLoot}`
            : `${styles.li_weapon} ${styles.pickOff}`
      }
      onClick={handleLi}
    >
          {weapon.title}
        </li>
      )
    }
    </>
  );
}

export default Weapon;
