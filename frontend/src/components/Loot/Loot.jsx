import { useSelector, useDispatch, } from "react-redux";
import { fetchLoot } from "../../features/loot/lootSlice";
import Equipped from "../Equipped/Equipped";
import styles from './Loot.module.css';

function Loot() {
  let firstItem, secondItem = null;
  const weapons = useSelector((state) => state.loot.weapons);
  console.log(weapons)

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLoot())
  };

  const swapWeapons = (first, second) => {
    console.log('swap weapons');

    if (document.querySelector('.selectedOne')) {
      console.log('selectedOne');
      document.querySelector('.selectedOne').replaceWith(secondItem);
      // document.querySelector('.selectedOne').classList.remove('selectedOne');

      console.log('selectedTwo');
      console.log(firstItem);
      console.log(secondItem);
      document.querySelector('.js-append').append(firstItem);
      // document.querySelector('.selectedTwo').classList.remove('selectedTwo');
    }
  }

  const handleSwap = () => {
    console.log('handleSwap')

  }

  const handleLi = (e) => {
    e.target.classList.add('selectedTwo');
    secondItem = e.target;
    if (firstItem) {
      swapWeapons(firstItem, secondItem);
      firstItem = secondItem = null;
    }
  }

  const handleLiOne = (e) => {
    e.target.classList.add('selectedOne');
    firstItem = e.target;
    if (secondItem) {
      swapWeapons(firstItem, secondItem);
      firstItem = secondItem = null;
    }
  }

  return (
    <div className={styles.loot_container}>
      <button className={styles.button_loot} type="button" onClick={handleClick}>Loot</button>
      {/* <Equipped handleLiOne={handleLiOne} /> */}
      <ul className={styles.container} >
        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>

        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>

        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>

        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>

        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>

        <li onClick={handleLiOne}>
          <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        </li>
      </ul >
      <ul className={`${styles.loot_container} ${styles.ul_loot} js-append`}>
        {weapons.map((weapon) => (
          <li key={weapon.id} onClick={handleLi}>{weapon.title} 🗡{weapon.ATK} 🛡{weapon.DEF}</li>
        ))}
      </ul>
      {
        weapons.length !== 0 &&
        <button className={styles.button_loot} type="button" onClick={handleSwap}>Swap</button>
      }
    </div>
  );
}

export default Loot;
