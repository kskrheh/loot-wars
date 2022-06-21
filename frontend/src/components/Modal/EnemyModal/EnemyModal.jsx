import React from 'react';
import './EnemyModal.css'
import {useSelector} from "react-redux";

const EnemyModal = () => {
  const enemy = useSelector((state) => state.enemy.enemy);
  console.log(enemy)
  return (
    <div className = 'app'>
      {
        enemy ?
          <p className = 'p'>{enemy.username}</p>
            :
          <p>Privet</p>
      }
    </div>
  );
}

export default EnemyModal;
