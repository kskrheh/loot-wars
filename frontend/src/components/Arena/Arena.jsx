import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";

import styles from "./Arena.module.css";
import lol from "../../img/crossed-swords-svgrepo-com.svg";

import Modal from "../Modal/Modal";
import EnemyModal from "../Modal/EnemyModal/EnemyModal";

import { fetchEnemyWeapons } from "../../features/enemy/enemySlice";
import { fetchUserWeapons } from "../../features/user/userSlice";

function Arena() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const users = useSelector((state) => state.users.users);
  const name = useSelector((state) => state.user.user.name);
  let enemyOne;

  const handleFetchUsers = () => {
    dispatch(fetchUsers(name));
  };

  useEffect(() => {
    handleFetchUsers();
  }, [name]);

  const handleClickEnemy = (id) => {
    setActive(true);
    enemyOne = users.filter((user) => user.id === +id);
    dispatch(fetchEnemyWeapons(enemyOne[0].username));
  };

  return (
    <>

      <div>
        <h1>Opponents</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
              <span> ATK {user.UserWeapons.reduce((acc, item) => acc + item.Weapon.ATK, 0)}</span>
              <span> DEF {user.UserWeapons.reduce((acc, item) => acc + item.Weapon.DEF, 0)}</span>
              <button

                className={styles.button}
                data-id={user.id}
                onClick={() => handleClickEnemy(user.id)}
              >
                <img className={styles.red} src={lol} alt="" />
                {/* Fight {user.username} */}

              </button>
            </li>
          ))}
        </ul>
        <button className={styles.random} onClick={handleFetchUsers}>
          Update
        </button>

        <Modal active={active} setActive={setActive}>
          <EnemyModal />
        </Modal>
      </div>
    </>
  );
}

export default Arena;
