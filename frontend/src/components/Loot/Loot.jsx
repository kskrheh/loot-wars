import { useSelector, useDispatch, } from "react-redux";
import { fetchLoot } from "../../features/loot/lootSlice";

function Loot() {
  const weapons = useSelector((state) => state.loot.weapons);
  console.log(weapons)

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLoot())
  };

  const handleSwap = () => {

  }

  return (
    <>
      <button type="button" onClick={handleClick}>Loot</button>
      <div>
        {weapons.map((weapon) => (
          <>
            <li key={weapon.id}>{weapon.title} {weapon.ATK} {weapon.DEF}</li>
            <button type="button" onClick={handleSwap}>Swap</button>
          </>
        ))}
      </div>
    </>
  );
}

export default Loot;
