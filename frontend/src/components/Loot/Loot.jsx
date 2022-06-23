import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoot,
  pickLootWeapon,
  removeWeapons,
} from "../../features/loot/lootSlice";
import {
  decreaseEnergy,
  fetchUserWeapons,
  increaseEnergy,
  pickWeapon,
} from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import Weapon from "./Weapon/Weapon";
import styles from "./Loot.module.css";

function Loot() {
  const weapons = useSelector((state) => state.loot.weapons);
  const user = useSelector((state) => state.user.user.name);
  const energy = useSelector((state) => state.user.user.energy);
  const userWeapons = useSelector((state) => state.user.user.weapons);

  const [delay, setDelay] = useState(1000);
  const [isPlaying, setPlaying] = useState(false);

  const dispatch = useDispatch();

  function useInterval(callback, delay) {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (!delay && delay !== 0) {
        return;
      }

      const id = setInterval(() => savedCallback.current(), delay);

      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(
    () => {
      dispatch(increaseEnergy());
      setPlaying(!isPlaying);
    },
    isPlaying ? delay : null
  );

  const handleClick = () => {
    dispatch(fetchLoot());
    dispatch(decreaseEnergy());
    setPlaying(!isPlaying);
  };

  const handleSwap = () => {
    const lengthPickLootWeapons = weapons.filter((el) => el.pick === 3); 
    const lengthPickUserWeapons = userWeapons.filter((el) => el.pick === 2);
    console.log(lengthPickLootWeapons,lengthPickUserWeapons)
    if(lengthPickLootWeapons.length === lengthPickUserWeapons.length){
      const arrBody = {lengthPickLootWeapons,lengthPickUserWeapons}
      const body = JSON.stringify({ arrBody, user: user });
      const fetchWeapons = async () => {
        const response = await fetch("http://localhost:4000/loot", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body,
        });
        const result = await response.json();
        console.log(result);
      };
  
      fetchWeapons();
      dispatch(fetchUserWeapons(user));
      dispatch(removeWeapons());
    }
  };

  const handleLi = (e) => {
    const { pertain } = e.target.dataset;
    console.log(pertain);
    if (pertain === "userWeapon") {
        dispatch(pickWeapon(e.target.dataset.ind));    
    }
    if (pertain === "lootWeapon") {
        dispatch(pickLootWeapon(e.target.dataset.ind));
      }
    }
    
  return (
    <div className={styles.loot_container}>
      <button
        className={styles.button_loot}
        type="button"
        onClick={handleClick}
      >
        Loot
      </button>
      <Equipped handleLi={handleLi} />
      <div className={`${styles.loot_container} ${styles.ul_loot}`}>
        {weapons.map((weapon, index) => (
          <Weapon
            key={index}
            pertain={"lootWeapon"}
            weapon={weapon}
            handleLi={handleLi}
            ind={index}
          />
        ))}
      </div>
      {weapons.length !== 0 && (
        <button
          className={styles.button_loot}
          type="button"
          onClick={handleSwap}
        >
          Swap
        </button>
      )}
    </div>
  );
}

export default Loot;
