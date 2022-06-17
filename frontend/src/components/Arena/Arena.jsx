import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";

function Arena() {
  const users = useSelector((state) => state.users);
  console.log(users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  return (
    <div>
      <h1>Privet</h1>
      {users.users.map((user) => <li key={user.id}>{user.username}</li>)}
    </div>
  )
}

export default Arena;
