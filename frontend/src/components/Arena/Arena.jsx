import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
import styles from "./Arena.module.css";
import Modal from "../Modal/Modal";
import EnemyModal from "../Modal/EnemyModal/EnemyModal";
import { fetchEnemyWeapons } from "../../features/enemy/enemySlice";
import bladesRedSvg from "../../img/svg/bladesRed.svg";
import bladesSvg from "../../img/svg/bladesBlack.svg";
import shieldSvg from "../../img/svg/shieldBlack.svg";

function Arena() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const users = useSelector((state) => state.users.users);
  const name = useSelector((state) => state.user.user.name);
  const loadingUsers = useSelector((state) => state.users.users.loadingUsers)
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
      { loadingUsers ? <p>Loading</p>
       : <div className={styles.arena_content}>
         <h1 className={styles.title}>Opponents</h1>
         <ul className={styles.ul_arena}>
           {users.map((user) => (
             <li className={styles.liArena} key={user.id}>
               {user.username}
               <span> <img className={styles.svgIcon} alt={''}
                              src={bladesSvg}/> {user.UserWeapons.reduce((acc, item) => acc + item.Weapon.ATK, 0)}</span>
               <span> <img className={styles.svgIcon} alt={''}
                              src={shieldSvg}/> {user.UserWeapons.reduce((acc, item) => acc + item.Weapon.DEF, 0)}</span>
               <button
                      className={styles.buttonArena}
                      onClick={() => handleClickEnemy(user.id)}
                  >
                 <img src={bladesRedSvg} alt=""/>
               </button>
             </li>
            ))}
         </ul>
         <button className={styles.random} onClick={handleFetchUsers}>
           Update
         </button>
         <Modal active={active} setActive={setActive}>
           <EnemyModal/>
         </Modal>
       </div>
      }
    </>
  );
}

export default Arena;
