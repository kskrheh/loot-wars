import React from 'react';
import './EnemyModal.css'
import {useSelector} from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";

const EnemyModal = () => {
  const enemy = useSelector((state) => state.enemy.enemy);
  return (
    <>
      <div className = 'app'>
        <span>{`ATK ${enemy.weapons.reduce((sumAtk, weapon) => sumAtk + weapon.ATK, 0)}`} </span>
        <span>{`DEF ${enemy.weapons.reduce((sumDef, weapon) => sumDef + weapon.DEF, 0)}`}</span>
        {
        enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
      }
        <button>Бить</button>
      </div>
    </>
  );
}

export default EnemyModal;
