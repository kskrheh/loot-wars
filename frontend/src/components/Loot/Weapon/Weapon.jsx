import styles from "./Weapon.module.css";
function Weapon({ weapon, handleLi, pertain }) {
  console.log(weapon);
  return (
    <li
      data-pertain={pertain}
      id={weapon.id}
      className={
        weapon.pick === 2
          ? styles.pickOnUserWeapon
          : weapon.pick === 3
          ? styles.pickOnLoot
          : styles.pickOff
      }
      onClick={handleLi}
    >
      {weapon.title}
      🗡 {weapon.ATK}
      🛡 {weapon.DEF}Q{weapon.quality}
    </li>
  );
}

export default Weapon;
