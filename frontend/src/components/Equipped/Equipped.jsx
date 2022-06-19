import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWeapons } from '../../features/user/userSlice';
import LoginForm from '../Auth/Login/LoginForm';
import RegistrationForm from '../Auth/Registration/RegistrationForm';
import styles from './Equipped.module.css';

const Equipped = ({ handleLiOne }) => {
  const [emptyArr] = useState(new Array(6).fill(' '))
  const user = useSelector((state) => state.user.user);
  const weapons = useSelector((state) => state.user.weapons);
  const dispatch = useDispatch();
  console.log(emptyArr)
  console.log(user.name)

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
              emptyArr.map((el, index) => {
                if (Object.keys(weapons[index].Weapon.length !== 0)) {
                  <li>{weapons[index].Weapon.title}</li>
                } else {
                  <li>Empty item</li>
                }
              })
              // weapons.map((weapon) => {
              //   if (Object.keys(weapon).length === 0) {
              //     return (
              //       <li className={styles.infoContainer} onClick={handleLiOne}>
              //         Empty item
              //       </li>
              //     )
              //   } else {
              //     return (
              //       <li className={styles.infoContainer} onClick={handleLiOne}>
              //         <span>{weapon.Weapon.title}</span> <span>🗡{weapon.Weapon.ATK}</span> <span>🛡{weapon.Weapon.DEF}</span>
              //       </li>
              //     )
              //   }
              // })
            }
          </ul>
          :
          <div className={styles.button_container}>
            <RegistrationForm />
            <LoginForm />
          </div>
      }
      {/* {
        <ul>
          {
            weaponQuantity.map((el, index) => {
              if (weapons[index] !== 0) {
                return (
                  <li className={styles.infoContainer} onClick={handleLiOne}>
                    <span>{weapons.title}</span> <span>🗡{weapons.ATK}</span> <span>🛡{weapons.DEF}</span>
                  </li>
                )
              }
              return (
                <li className={styles.infoContainer} onClick={handleLiOne}>
                  <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
                </li>
              )
            }
          }
        </ul>
      }) */
        // user.user.name ?
        //   <ul className={styles.container} >
        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>

        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>

        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>

        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>

        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>

        //     <li className={styles.infoContainer} onClick={handleLiOne}>
        //       <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
        //     </li>
        //   </ul >
        //   :

      }
    </>
  );
};

export default Equipped;
