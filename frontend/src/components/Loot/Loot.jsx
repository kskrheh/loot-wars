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

  const [arrayIds, setArrayIds] = useState({
    userWeaponID: [],
    lootWeaponID: [],
    errorLoot: undefined,
  });
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
    const body = JSON.stringify({ arrayIds, user: user });
    console.log(body, '<------BODY');
    const fetchWeapons = async () => {
      const response = await fetch("/api/loot", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body,
        credentials: "include",
      });
      const result = await response.json();
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
    console.log(weapons, 'пушки с лута');
    if (weapons.length) {
      const { pertain } = e.target.dataset;
      const dublicateCount = userWeapons.filter(
        (el) => +el.id === +e.target.id
      ).length;
      const dublicateWeapons = weapons.filter(
        (el) => +el.id === +e.target.id
      ).length;
      let count =
        userWeapons.length -
        arrayIds.userWeaponID.length +
        arrayIds.lootWeaponID.length;
      console.log(count, 'count')
      if (count <= 6) {
        if (pertain === "userWeapon") {
          if (
            arrayIds.userWeaponID.filter((el) => +el === +e.target.id)
              .length !== +dublicateCount
          ) {
            dispatch(pickWeapon(e.target.id));
            // e.target.style.backgroundColor = "green";
            setArrayIds((prevState) => {
              return {
                ...prevState,
                userWeaponID: [...prevState.userWeaponID, e.target.id],
                errorLoot: "",
              };
            });
          } else {
            // e.target.style.backgroundColor = "white";
            dispatch(pickWeapon(e.target.id));
            setArrayIds((prevState) => {
              const index = prevState.userWeaponID.findIndex(
                (el) => el === e.target.id
              );
              const newUserWeaponID = [...prevState.userWeaponID];
              newUserWeaponID.splice(index, 1);
              return {
                ...prevState,
                userWeaponID: newUserWeaponID,
                errorLoot: "",
              };
            });
          }
        }

        if (pertain === "lootWeapon") {
          if (count < 6) {
            if (
              arrayIds.lootWeaponID.filter((el) => +el === +e.target.id)
                .length !== +dublicateWeapons
            ) {
              // e.target.style.backgroundColor = "green";
              dispatch(pickLootWeapon(e.target.id));
              setArrayIds((prevState) => {
                return {
                  ...prevState,
                  lootWeaponID: [...prevState.lootWeaponID, e.target.id],
                  errorLoot: "",
                };
              });
            } else {
              // e.target.style.backgroundColor = "#5e2e2e";
              dispatch(pickLootWeapon(e.target.id));
              setArrayIds((prevState) => {
                const index = prevState.lootWeaponID.findIndex(
                  (el) => el === e.target.id
                );
                console.log(index, "индеч");
                const newLootWeaponID = [...prevState.lootWeaponID];
                newLootWeaponID.splice(index, 1);
                return {
                  ...prevState,
                  lootWeaponID: newLootWeaponID,
                  errorLoot: "",
                };
              });
            }
          } else {
            setArrayIds((prevState) => {
              return {
                ...prevState,
                errorLoot:
                  "У вас максимальное количество оружия(6), попробуйте выставить ненужные вам пушки на выброс",
              };
            });
          }
          console.log(arrayIds);
        }
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
      <div className={`${styles.loot_container} ${styles.ul_loot}`}>
        {weapons.map((weapon, index) => (
          <Weapon
            key={index}
            pertain={"lootWeapon"}
            weapon={weapon}
            handleLi={handleLi}
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
      {arrayIds.errorLoot && <h5>{arrayIds.errorLoot}</h5>}
    </div>
  );
}

export default Loot;
