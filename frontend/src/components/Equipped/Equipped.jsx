import { useSelector } from 'react-redux';
import LoginForm from '../Auth/Login/LoginForm';
import RegistrationForm from '../Auth/Registration/RegistrationForm';
import styles from './Equipped.module.css';

const Equipped = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {
        user.user ?
          < div className={styles.container} >
            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>

            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>

            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>

            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>

            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>

            <div className={styles.infoContainer}>
              <div>{ }</div> <div>🗡{ }</div> <div>🛡{ }</div>
            </div>
          </div >
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
