function Weapon({ weapon, handleLi, pertain }) {
  return (
    <tr data-pertain={pertain} id={weapon.id} onClick={handleLi}>
      <td>{weapon.title} </td>
      <td>🗡 {weapon.ATK} </td>
      <td>🛡 {weapon.DEF}</td>
      <td> Q{weapon.quality}</td>
    </tr>
  );
}

export default Weapon;
