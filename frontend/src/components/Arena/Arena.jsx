import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
import './App.css'

import Modal from "../Modal/Modal";
import EnemyModal from "../Modal/EnemyModal/EnemyModal";
import {fetchEnemyWeapons} from "../../features/enemy/enemySlice";

function Arena() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  // const [idEnemy, setIdEnemy] = useState();
  const users = useSelector((state) => state.users.users);
  const name = useSelector((state) => state.user.user.name);
  // const enemy = useSelector(((state) => state.enemy.enemy.name));
  let enemyOne;

  const handleFetchUsers = () => {
    dispatch(fetchUsers(name));
  }

  useEffect(() => {
      handleFetchUsers()
  }, [name])

    const handleClickEnemy = (event) => {
        setActive(true);
        enemyOne = users.filter((user) => user.id === +event.target.dataset.id);
        dispatch(fetchEnemyWeapons(enemyOne[0].username));
    }

  return (
    <>
      <h1>Enemies</h1>
      <ul>
        {
        users.map((user) => (
          <li key={user.id}>{user.username}
            <button data-id={user.id} onClick={handleClickEnemy}>Fight with {user.username}</button>
          </li>
          )
        )
      }
      </ul>
      <button onClick={handleFetchUsers}>Shuffle opponents</button>
      <Modal active={active} setActive={setActive}>
        <EnemyModal/>
      </Modal>
    </>
  )
}

export default Arena;
