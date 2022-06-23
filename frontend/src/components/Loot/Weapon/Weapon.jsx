import styles from "./Weapon.module.css";
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
          🗡 {weapon.ATK}
          🛡 {weapon.DEF}
          Q {weapon.quality}
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
