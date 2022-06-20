import React from 'react';
import './EnemyModal.css'
import {useSelector} from "react-redux";

const EnemyModal = ({idEnemy}) => {
 const users = useSelector((state) => state.users.users);
 const user = users.filter((user) => user.id === +idEnemy);
    console.log(user)
  return (
    <div className = 'app'>
      {idEnemy}
    </div>
  );
}

export default EnemyModal;
