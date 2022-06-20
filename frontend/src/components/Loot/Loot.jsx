import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoot, removeWeapons } from "../../features/loot/lootSlice";
import { fetchUserWeapons } from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import styles from "./Loot.module.css";
import Weapon from "./Weapon/Weapon";

function Loot() {
  const weapons = useSelector((state) => state.loot.weapons);
  const user = useSelector((state) => state.user.user.name);
  const userWeapons = useSelector((state) => state.user.user.weapons);
  const [arrayIds, setArrayIds] = useState({
    userWeaponID: [],
    lootWeaponID: [],
    errorLoot: undefined,
  });
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchLoot());
  };

  const handleSwap = () => {
    let limit;
    if(!userWeapons.length){
      limit = Math.abs(arrayIds.lootWeaponID.length - arrayIds.userWeaponID.length);
    }else{
      if(arrayIds.userWeaponID.length > arrayIds.lootWeaponID.length){
        limit = userWeapons.length - (arrayIds.userWeaponID.length - arrayIds.lootWeaponID.length);
      }
      if(arrayIds.userWeaponID.length < arrayIds.lootWeaponID.length){
        limit = userWeapons.length + (arrayIds.lootWeaponID.length - arrayIds.userWeaponID.length);
      }
      if(arrayIds.userWeaponID.length === arrayIds.lootWeaponID.length){
        limit = userWeapons.length;
      }
    }
    console.log(limit);
    if (+limit <= 6) {
      const body = JSON.stringify({ arrayIds, user: user });
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
      setArrayIds({
        userWeaponID: [],
        lootWeaponID: [],
        errorLoot: undefined,
      });
      dispatch(removeWeapons())
    } else {
      setArrayIds((prevState) => {
        return {
          ...prevState,
          errorLoot: "У вас максимальное количество оружия",
        };
      });
    }
  };

  const handleLi = (e) => {
    const { pertain } = e.target.dataset;
    let limit;
    if(!userWeapons.length){
      limit = Math.abs(arrayIds.lootWeaponID.length - arrayIds.userWeaponID.length);
    }else{
      if(arrayIds.userWeaponID.length > arrayIds.lootWeaponID.length){
        limit = userWeapons.length - (arrayIds.userWeaponID.length - arrayIds.lootWeaponID.length);
      }
      if(arrayIds.userWeaponID.length < arrayIds.lootWeaponID.length){
        limit = userWeapons.length + (arrayIds.lootWeaponID.length - arrayIds.userWeaponID.length);
      }
      if(arrayIds.userWeaponID.length === arrayIds.lootWeaponID.length){
        limit = userWeapons.length;
      }
    }
    console.log(limit);
    if (pertain === "userWeapon") {
      e.target.style.backgroundColor = "green";
      setArrayIds((prevState) => {
        return {
          ...prevState,
          userWeaponID: [...prevState.userWeaponID, e.target.id],
        };
      });
    }
    if(limit < 6){
      e.target.style.backgroundColor = "green";

      if (pertain === "lootWeapon") {
        setArrayIds((prevState) => {
          return {
            ...prevState,
            lootWeaponID: [...prevState.lootWeaponID, e.target.id],
          };
        });
      }
      console.log(arrayIds);
    }
  };
  
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
      <ul className={`${styles.loot_container} ${styles.ul_loot}`}>
        {weapons.map((weapon) => (
          <Weapon
            key={weapon.id}
            pertain={"lootWeapon"}
            weapon={weapon}
            handleLi={handleLi}
          />
        ))}
      </ul>
      {weapons.length !== 0 && (
        <button
          className={styles.button_loot}
          type="button"
          onClick={handleSwap}
        >
          Swap
        </button>
      )}
      {arrayIds.errorLoot && <h5>{arrayIds.errorLoot}</h5>}
    </div>
  );
}

export default Loot;
