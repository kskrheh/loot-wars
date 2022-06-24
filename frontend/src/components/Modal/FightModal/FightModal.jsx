import { useDispatch, useSelector } from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import { useEffect, useState } from "react";
import { fetchWeaponsTake, pickEnemyWeapon } from "../../../features/enemy/enemySlice";
import { fetchFightUserUpdate, pickWeapon } from "../../../features/user/userSlice";
import styles from './FightModal.module.css'

function FightModal({ active, setActive }) {
  const dispatch = useDispatch();
  const enemy = useSelector((state) => state.enemy.enemy);
  const user = useSelector((state) => state.user.user);
  const userFight = useSelector((state) => state.user.user.fight)
  const [userWin, setUserWin] = useState();

  const shuffle = (arr) => {
    return arr
      .map((el) => [Math.random(), el])
      .sort()
      .map((el) => el[1]);
  };

  useEffect(() => {
    const enemyWeapons = shuffle(enemy.weapons);
    const atkEnemyArr = enemyWeapons.map((weapon) => weapon.ATK);
    const defEnemyArr = enemyWeapons.map((weapon) => weapon.DEF);

    const userWeapons = shuffle(user.weapons);
    const atkUserArr = userWeapons.map((weapon) => weapon.ATK);
    const defUserArr = userWeapons.map((weapon) => weapon.DEF);

    let userScore = 0;
    let enemyScore = 0;

    for (let i = 0; i < 6; i++) {
      if (atkUserArr[i] > defEnemyArr[i]) {
        userScore += 1;
      } else enemyScore += 1;

      if (atkEnemyArr[i] > defUserArr[i]) {
        enemyScore += 1;
      } else userScore += 1;
    }
    if (userScore > enemyScore) {
      setUserWin(true);
    } else setUserWin(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSwap = (e) => {
    const { pertain } = e.target.dataset;
    if (pertain === "playerWeapon") {
      dispatch(pickWeapon(e.target.dataset.ind));
    }
    if (pertain === "enemyWeapon") {
      dispatch(pickEnemyWeapon(e.target.dataset.ind));
    }
  };
  const swapWeapon = () => {
    const lengthPickEnemyWeapons = enemy.weapons.filter((el) => el.pick === 3);
    const lengthPickUserWeapons = user.weapons.filter((el) => el.pick === 2);
    console.log(lengthPickEnemyWeapons, lengthPickUserWeapons)
    if (lengthPickEnemyWeapons.length === 1 && lengthPickUserWeapons.length === 1) {
      const arrBody = { lengthPickEnemyWeapons, lengthPickUserWeapons };
      const body = JSON.stringify({ arrBody, user: user });
      dispatch(fetchWeaponsTake(body))
      if (userFight) {
        dispatch(fetchFightUserUpdate(enemy.id));
      }
      setActive(false);
    }
  }
  return (
    <>
      {userWin ? (
        <>
          <div className={styles.text}>Victory</div>
          <ul className={styles.my_weapons}>
            {user.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} handleLi={handleSwap} pertain={"playerWeapon"} ind={index} />
            ))}
          </ul>
          <ul className={styles.my_weapons}>
            {enemy.weapons.map((weapon, index) => (
              <Weapon
                weapon={weapon}
                key={index}
                handleLi={handleSwap}
                pertain={"enemyWeapon"}
                ind={index}
              />
            ))}
          </ul>
          <button className={styles.button_fight} onClick={swapWeapon}>Swap
          </button>
        </>
      ) : (
        <>
          <div className={styles.text}>Defeat</div>
          <ul className={styles.my_weapons}>
            {user.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} />
            ))}
          </ul>
          <ul className={styles.my_weapons}>
            {enemy.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default FightModal;
