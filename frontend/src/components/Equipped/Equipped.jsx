import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWeapons } from '../../features/user/userSlice';
import LoginForm from '../Auth/Login/LoginForm';
import RegistrationForm from '../Auth/Registration/RegistrationForm';
import Weapon from '../Loot/Weapon/Weapon';
import styles from './Equipped.module.css';

const Equipped = ({ handleLi }) => {
  const [emptyArr] = useState(new Array(6).fill(' '))
  const user = useSelector((state) => state.user.user);
  const weapons = useSelector((state) => state.user.user.weapons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.name) {
      dispatch(fetchUserWeapons(user.name));
    }
  }, [dispatch, user.name])

  return (
    <>
      {
        user.name ?
          <ul className={styles.container}>
            {
              weapons.length >= 0 &&
              emptyArr.map((el, index) => {
                if (weapons[index]) {
                  return (
                    <Weapon key={weapons[index].id} weapon={weapons[index]} handleLi={handleLi} />
                  )
                } else {
                  return (
                    <li key={index} className={styles.infoContainer} onClick={handleLi}>No item</li>
                  )
                }
              })
            }
          </ul>
          :
          <div className={styles.button_container}>
            <RegistrationForm />
            <LoginForm />
          </div>
      }
    </>
  );
};

export default Equipped;
