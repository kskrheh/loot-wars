import React from 'react';
import './EnemyModal.css'
import { useDispatch, useSelector } from "react-redux";
import Weapon from "../../Loot/Weapon/Weapon";
import FightModal from "../FightModal/FightModal";
import { fetchFightUserUpdate, fightEnergy } from "../../../features/user/userSlice";

const EnemyModal = ({ active, setActive }) => {
  const fight = useSelector((state) => state.user.user.fight);
  const energy = useSelector((state) => state.user.user.energy);
  const enemy = useSelector((state) => state.enemy.enemy);
  const dispatch = useDispatch()

  const handleClick = () => {
    if (energy >= 3) {
      dispatch(fetchFightUserUpdate(enemy.id));
      dispatch(fightEnergy());
    }
  }

  return (
    <>
      {fight ?
        <FightModal active={active} setActive={setActive} />
        :
        <div className='app'>
          <span>{`ATK ${enemy.weapons.reduce((sumAtk, weapon) => sumAtk + weapon.ATK, 0)}`} </span>
          <span>{`DEF ${enemy.weapons.reduce((sumDef, weapon) => sumDef + weapon.DEF, 0)}`}</span>
          {
            enemy.weapons.map((weapon, index) => <Weapon weapon={weapon} key={index} />)
          }
          <button onClick={handleClick}>Бить</button>
          {energy < 3 && <span>Подождите пока восстановится энергия</span>}
        </div>
      }
    </>
  );
}

export default EnemyModal;
