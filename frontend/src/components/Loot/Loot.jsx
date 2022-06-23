import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoot,
  pickLootWeapon,
  removeWeapons,
} from "../../features/loot/lootSlice";
import {
  decreaseEnergy,
  fetchUserWeapons,
  fetchWeapons,
  pickWeapon,
  errorEnergyMessage,
} from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import Weapon from "./Weapon/Weapon";
import styles from "./Loot.module.css";

function Loot() {
  const weapons = useSelector((state) => state.loot.weapons);
  const user = useSelector((state) => state.user.user.name);
  const energy = useSelector((state) => state.user.user.energy);
  const userWeapons = useSelector((state) => state.user.user.weapons);
  const swapCheck = useSelector((state) => state.user.swapCheck);
  const errorEnergyCheck = useSelector((state) => state.user.errorEnergy);
  const [errPick, setErrPick] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (energy !== 0) {
      dispatch(fetchLoot());
      dispatch(decreaseEnergy());
    } else {
      dispatch(errorEnergyMessage(true));
    }
  };

  const handleSwap = () => {
    const lengthPickLootWeapons = weapons.filter((el) => el.pick === 3);
    const lengthPickUserWeapons = userWeapons.filter((el) => el.pick === 2);
    if (lengthPickLootWeapons.length === lengthPickUserWeapons.length) {
      const arrBody = { lengthPickLootWeapons, lengthPickUserWeapons };
      const body = JSON.stringify({ arrBody, user: user });
      dispatch(fetchWeapons(body));
      dispatch(removeWeapons());
    } else {
      setErrPick(true);
    }
  };
  
  if (swapCheck) {
    dispatch(fetchUserWeapons(user));
  }
  const handleLi = (e) => {
    const data = e.target.closest('li').dataset;
    const { pertain } = data;
    if (pertain === "userWeapon") {
      setErrPick(false);
      dispatch(pickWeapon(data.ind));
    }
    if (pertain === "lootWeapon") {
      setErrPick(false);
      dispatch(pickLootWeapon(data.ind));
    }
  };

  return (
    <div className={styles.loot_container}>
      <Equipped handleLi={handleLi} />
      <button
          className={styles.button_loot}
          type="button"
          onClick={handleClick}
      >
        Loot
      </button>
      {
        weapons.length > 0 &&
          <div className={`${styles.loot_container} ${styles.ul_loot} ${styles.ul_width}`}>
            <ul className={styles.ulEquipped}>
              {weapons.map((weapon, index) => (
                <Weapon
                      key={index}
                      pertain={"lootWeapon"}
                      weapon={weapon}
                      handleLi={handleLi}
                      ind={index}
                  />
              ))}
            </ul>
          </div>
      }

      {weapons.length !== 0 && (
        <button
          className={styles.button_loot}
          type="button"
          onClick={handleSwap}
        >
          Swap
        </button>
      )}
      {errPick && <span>Выберите одинаковое количество лута</span>}
      {errorEnergyCheck && <span>Подождите пока восстановится энергия</span>}
    </div>
  );
}

export default Loot;
