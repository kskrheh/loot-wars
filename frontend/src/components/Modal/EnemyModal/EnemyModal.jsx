import React from 'react';
import './EnemyModal.css'
import {useSelector} from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";

const EnemyModal = () => {
  const enemy = useSelector((state) => state.enemy.enemy);
  console.log(enemy)
  return (
    <div className = 'app'>
      {
        enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
      }
      <button>Бить</button>
    </div>
  );
}

export default EnemyModal;
