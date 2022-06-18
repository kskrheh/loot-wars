import { useSelector } from 'react-redux';
import LoginForm from '../Auth/Login/LoginForm';
import RegistrationForm from '../Auth/Registration/RegistrationForm';
import styles from './Equipped.module.css';

const Equipped = ({ handleLiOne }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {
        user.user.name ?
          <ul className={styles.container} >
            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>

            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>

            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>

            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>

            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>

            <li className={styles.infoContainer} onClick={handleLiOne}>
              <span>{ }</span> <span>🗡{ }</span> <span>🛡{ }</span>
            </li>
          </ul >
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
