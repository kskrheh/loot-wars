import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoot, removeWeapons } from "../../features/loot/lootSlice";
import { fetchUserWeapons } from "../../features/user/userSlice";
import Equipped from "../Equipped/Equipped";
import Weapon from "./Weapon/Weapon";
import styles from "./Loot.module.css";

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
    setArrayIds({
      userWeaponID: [],
      lootWeaponID: [],
      errorLoot: undefined,
    });
    dispatch(removeWeapons());
    dispatch(fetchUserWeapons(user));
  };

  const handleLi = (e) => {
    const { pertain } = e.target.dataset;
    const dublicateCount = userWeapons.filter((el) => +el.id === +e.target.id).length
    console.log('dublicateCount', dublicateCount);
    let count =
      userWeapons.length -
      arrayIds.userWeaponID.length +
      arrayIds.lootWeaponID.length;
    if (count <= 6) {
      if (pertain === "userWeapon") {
        console.log(count);
        if (!arrayIds.userWeaponID.includes(e.target.id)) {
          e.target.style.backgroundColor = "green";
          setArrayIds((prevState) => {
            return {
              ...prevState,
              userWeaponID: [...prevState.userWeaponID, e.target.id],
              errorLoot: "",
            };
          });
        }else{
          e.target.style.backgroundColor = "white";
          setArrayIds((prevState) => {
            return {
              ...prevState,
              userWeaponID: [...prevState.userWeaponID.filter((el) => el !== e.target.id)],
              errorLoot: "",
            };
          });
        }
      }

      if (pertain === "lootWeapon") {
        if (count < 6) {
          if (!arrayIds.lootWeaponID.includes(e.target.id)) {
            e.target.style.backgroundColor = "green";
            setArrayIds((prevState) => {
              return {
                ...prevState,
                lootWeaponID: [...prevState.lootWeaponID, e.target.id],
                errorLoot: "",
              };
            });
          } else {
            e.target.style.backgroundColor = "#5e2e2e";
            setArrayIds((prevState) => {
              return {
                ...prevState,
                lootWeaponID: [
                  ...prevState.lootWeaponID.filter((el) => el !== e.target.id),
                ],
                errorLoot: "",
              };
            });
          }
        } else {
          setArrayIds((prevState) => {
            return {
              ...prevState,
              errorLoot: "У вас максимальное количество оружия(6), попробуйте выставить ненужные вам пушки на выброс",
            };
          });
        }
        console.log(arrayIds);
      }
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
        {weapons.map((weapon, index) => (
          <Weapon
            key={index}
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
