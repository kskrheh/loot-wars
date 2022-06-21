function Weapon({ weapon, handleLi, pertain }) {
  return (
    <li data-pertain={pertain} id={weapon.id} onClick={handleLi}>
      {weapon.title}
      🗡 {weapon.ATK}
      🛡 {weapon.DEF}  Q{weapon.quality}
    </li>
  );
}

export default Weapon;
