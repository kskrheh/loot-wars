import { useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { fetchLoot } from "../../features/loot/lootSlice";
import { weaponsId } from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import styles from './Loot.module.css';

function Loot() {
  let firstItem, secondItem = null;
  const weapons = useSelector((state) => state.loot.weapons);
  const user = useSelector((state) => state.user.user.name)
  const userReduxWeapons = useSelector((state) => state.user.user.weaponsId);
  console.log(userReduxWeapons)

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
    const body = JSON.stringify({ userReduxWeapons, user: user });
    const fetchWeapons = async () => {
      const response = await fetch('http://localhost:4000/loot', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body,
      })
      const result = await response.json();
      console.log(result);
    }

    fetchWeapons();
  }

  const handleLi = (e) => {
    e.target.classList.add('selectedTwo');
    secondItem = e.target;

    dispatch(weaponsId(e.target.dataset.id))
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
          <li data-id={weapon.id} key={weapon.id} onClick={handleLi}>
            <span>{weapon.title} </span>
            <span>🗡 {weapon.ATK} </span>
            <span>🛡 {weapon.DEF}</span>
          </li>
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
