import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";

import Modal from "../Modal/Modal";

function Arena() {
  const users = useSelector((state) => state.users);
  console.log(users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  return (
    <>
      <h1>Enemies</h1>
      {users.users.map((user) => <li key={user.id}>{user.username}</li>)}
      {/* <Modal /> */}
    </>
  )
}

export default Arena;
