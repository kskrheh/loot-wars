import { useDispatch, useSelector } from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import { useEffect, useState } from "react";
import { fetchWeaponsTake, pickEnemyWeapon } from "../../../features/enemy/enemySlice";
import { pickWeapon } from "../../../features/user/userSlice";

function FightModal() {
  const dispatch = useDispatch();
  const enemy = useSelector((state) => state.enemy.enemy);
  const user = useSelector((state) => state.user.user);
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
  }, []);

  const handleSwap = (e) => {
    const { pertain } = e.target.dataset;
    if (pertain === "playerWeapon") {
      //setErrPick(false);
      dispatch(pickWeapon(e.target.dataset.ind));
    }
    if (pertain === "enemyWeapon") {
      //setErrPick(false);
      dispatch(pickEnemyWeapon(e.target.dataset.ind));
    }
  };
  const swapWeapon = () => {
    const lengthPickEnemyWeapons = enemy.weapons.filter((el) => el.pick === 3);
    const lengthPickUserWeapons = user.weapons.filter((el) => el.pick === 2);
    console.log(lengthPickEnemyWeapons,lengthPickUserWeapons)
    if(lengthPickEnemyWeapons.length === 1 && lengthPickUserWeapons.length === 1){
      const arrBody = { lengthPickEnemyWeapons, lengthPickUserWeapons };
      const body = JSON.stringify({ arrBody, user: user});
      dispatch(fetchWeaponsTake(body))
    }
  }
  return (
    <>
      {userWin ? (
        <>
          <ul>
            {user.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} handleLi={handleSwap} pertain={"playerWeapon"} ind={index}/>
            ))}
          </ul>
          <ul>
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
          <p>Victory</p>
          <button onClick={swapWeapon}>Swap
          </button>
        </>
      ) : (
        <>
          <ul>
            {user.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} />
            ))}
          </ul>
          <ul>
            {enemy.weapons.map((weapon, index) => (
              <Weapon weapon={weapon} key={index} />
            ))}
          </ul>
          <p>Defeat</p>
        </>
      )}
    </>
  );
}

export default FightModal;
