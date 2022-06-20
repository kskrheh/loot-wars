import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
import './App.css'

// import Modal from "../Modal/Modal";
import AppModalka from '../AppModalka/AppModalka';

function Arena() {
  const [modalActive, setModalActive] = useState(false)
  const users = useSelector((state) => state.users.users);
  const name = useSelector((state) => state.user.user.name)
  const dispatch = useDispatch();

  const handleFetchUsers = () => {
    dispatch(fetchUsers(name));
  }
  useEffect(() => {
      handleFetchUsers()
  }, [name])

  return (
    <>
      <h1>Enemies</h1>
      <ul>
        {
        users.map((user) => (
          <li key={user.id}>{user.username}
            <button data-id={user.id}>Fight with {user.username}</button>
          </li>
          )
        )
      }
      </ul>
      <button onClick={handleFetchUsers}>Shuffle opponents</button>
      <AppModalka active={modalActive} setActive={setModalActive} />
    </>
  )
}

export default Arena;
