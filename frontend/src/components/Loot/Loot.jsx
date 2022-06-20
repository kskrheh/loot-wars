import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoot } from "../../features/loot/lootSlice";
import { fetchUserWeapons } from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import styles from './Loot.module.css';
import Weapon from "./Weapon/Weapon";

function Loot() {
  const [arrayIds, setArrayIds] = useState([]);
  const weapons = useSelector((state) => state.loot.weapons);
  const user = useSelector((state) => state.user.user.name);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLoot())
  };

  const handleSwap = () => {
    const body = JSON.stringify({ arrayIds, user: user });
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
    dispatch(fetchUserWeapons(user));
    setArrayIds([]);
  }

  const handleLi = (e) => {
    if (arrayIds.length < 2) {
      setArrayIds((prevState) => [...prevState, e.target.id]);
      // setArrayIds((prevState) => prevState.push([e.target.id]));
    }
    console.log(arrayIds);
  }

  return (
    <div className={styles.loot_container}>
      <button className={styles.button_loot} type="button" onClick={handleClick}>Loot</button>
      <Equipped handleLi={handleLi} />
      <ul className={`${styles.loot_container} ${styles.ul_loot}`}>
        {weapons.map((weapon) => (
          <Weapon key={weapon.id} weapon={weapon} handleLi={handleLi} />
        ))}
      </ul>
      {
        weapons.length !== 0 &&
        <button className={styles.button_loot} type="button" onClick={handleSwap}>Swap</button>
      }
    </div >
  );
}

export default Loot;
