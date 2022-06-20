import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWeapons } from '../../features/user/userSlice';
import LoginForm from '../Auth/Login/LoginForm';
import RegistrationForm from '../Auth/Registration/RegistrationForm';
import styles from './Equipped.module.css';

const Equipped = ({ handleLiOne }) => {
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
          <ul className={`${styles.container} js-append-one`}>
            {
              weapons.length >= 0 &&
              emptyArr.map((el, index) => {
                if (weapons[index]) {
                  return (
                    <li key={index} data-id={weapons[index].Weapon.id} className={styles.infoContainer} onClick={handleLiOne}>
                      <span>{weapons[index].Weapon.title}</span>
                      <span>🗡{weapons[index].Weapon.ATK}</span>
                      <span>🛡{weapons[index].Weapon.DEF}</span>
                      <span>Q{weapons[index].Weapon.quality}</span>
                    </li>
                  )
                } else {
                  return (
                    <li key={index} className={styles.infoContainer} onClick={handleLiOne}>No item</li>
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
