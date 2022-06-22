import styles from './Weapon.module.css'


function Weapon({ weapon, handleLi, pertain }) {
  return (
    <div className={styles.li} data-pertain={pertain} id={weapon.id} onClick={handleLi}>
      <div>{weapon.title}</div>
      <div>🗡 {weapon.ATK}</div>
      <div>🛡 {weapon.DEF}</div>
      <div>Q{weapon.quality}</div> 
    </div>
  );
}

export default Weapon;
