import React from 'react';
import './EnemyModal.css'
import {useDispatch, useSelector} from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import FightModal from "../FightModal/FightModal";
import {fetchFightUserUpdate, isFighting} from "../../../features/user/userSlice";

const EnemyModal = () => {
  const fight = useSelector((state) => state.user.user.fight)
  const enemy = useSelector((state) => state.enemy.enemy);
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(fetchFightUserUpdate(enemy.id));
  }

  return (
    <>
      { fight ?
        <FightModal/>
         :
        <div className='app'>
          <span>{`ATK ${enemy.weapons.reduce((sumAtk, weapon) => sumAtk + weapon.ATK, 0)}`} </span>
          <span>{`DEF ${enemy.weapons.reduce((sumDef, weapon) => sumDef + weapon.DEF, 0)}`}</span>
          {
            enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index}/>)
          }
          <button onClick={handleClick}>Бить</button>
        </div>
      }
    </>
  );
}

export default EnemyModal;
