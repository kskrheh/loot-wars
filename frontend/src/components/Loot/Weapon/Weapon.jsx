function Weapon({ weapon, handleLi }) {
  return (
    <li id={weapon.id} onClick={handleLi}>
      <span>{weapon.title} </span>
      <span>🗡 {weapon.ATK} </span>
      <span>🛡 {weapon.DEF}</span>
      <span> Q{weapon.quality}</span>
    </li>
  )
}

export default Weapon;
