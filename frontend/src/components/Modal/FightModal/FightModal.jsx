import React from 'react';
import {useSelector} from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import { useEffect } from "react";

function FightModal() {
    const enemy = useSelector((state) => state.enemy.enemy);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const atkEnemyArr = enemy.weapons.map(weapon => weapon.ATK);
        const defEnemyArr = enemy.weapons.map(weapon => weapon.DEF);

        const atkUserArr = user.weapons.map(weapon => weapon.ATK);
        const defUserArr = user.weapons.map(weapon => weapon.DEF);
        console.log(atkEnemyArr)
        console.log(defEnemyArr)
        console.log(atkUserArr)
        console.log(defUserArr)
    }, [])

    return(
      <>
        <ul>
          {
              enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
              }
        </ul>
        <ul>{
          user.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
        }
        </ul>
      </>
    )
}

export default FightModal;
