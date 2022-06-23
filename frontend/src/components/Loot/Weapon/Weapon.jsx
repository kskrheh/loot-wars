import styles from "./Weapon.module.css";
function Weapon({ weapon, handleLi, pertain, ind }) {
  return (
    <>
      {
      weapon.title !== 'No item' ? (
        <div
      data-pertain={pertain}
      id={weapon.id}
      data-ind={ind}
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
        </div>
      ) : (
        <div
      data-pertain={pertain}
      id={weapon.id}
      data-ind={ind}
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
        </div>
      )
    }
    </>
  );
}

export default Weapon;
