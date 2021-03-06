import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserWeapons } from "../../features/user/userSlice";

import LoginForm from "../Auth/Login/LoginForm";
import RegistrationForm from "../Auth/Registration/RegistrationForm";

import Weapon from "../Loot/Weapon/Weapon";

import styles from "./Equipped.module.css";
import im from "../../img/H1/307380.svg";

const Equipped = ({ handleLi }) => {
  const [emptyArr] = useState(new Array(6).fill(" "));
  const user = useSelector((state) => state.user.user);
  const weapons = useSelector((state) => state.user.user.weapons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.name) {
      dispatch(fetchUserWeapons(user.name));
    }
  }, [dispatch, user.name]);

  return (
    <>
      {user.name ? (
        <div className={styles.container}>
          <h1 className={styles.title}>Your equipment</h1>
          <ul className={styles.ulEquipped}>
            {weapons.length >= 0 &&
              emptyArr.map((el, index) => {
                if (weapons[index]) {
                  return (
                    <Weapon
                      key={index}
                      pertain={"userWeapon"}
                      weapon={weapons[index]}
                      handleLi={handleLi}
                      ind={index}
                    />
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={styles.infoContainer}
                      onClick={handleLi}
                      data-pertain={"userWeapon"}
                      data-ind={index}
                    >
                      No item
                    </div>
                  );
                }
              })}
          </ul>
        </div>
      ) : (
        <>
          <h1 className={styles.WARS}>
            LOOT-WARS <img className={styles.sv} src={im} />
          </h1>
          <div className={styles.button_container}>
            <div className={styles.divRega}>
              <RegistrationForm />

              <div className={styles.divLoga}>
                <LoginForm />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Equipped;
