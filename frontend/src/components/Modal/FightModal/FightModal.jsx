import React from "react";
import { useSelector } from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import { useEffect } from "react";
import styles from './FightModal.module.css'

function FightModal() {
  const enemy = useSelector((state) => state.enemy.enemy);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const atkEnemyArr = enemy.weapons.map((weapon) => weapon.ATK);
    const defEnemyArr = enemy.weapons.map((weapon) => weapon.DEF);

    const atkUserArr = user.weapons.map((weapon) => weapon.ATK);
    const defUserArr = user.weapons.map((weapon) => weapon.DEF);
    console.log(atkEnemyArr);
    console.log(defEnemyArr);
    console.log(atkUserArr);
    console.log(defUserArr);
  }, []);

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalUl}>
          {enemy.weapons.map((weapon, index) => (
            <Weapon weapon={weapon} key={index} />
          ))}
        </div>
        <div className={styles.modalUl}>
          {user.weapons.map((weapon, index) => (
            <Weapon weapon={weapon} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FightModal;
