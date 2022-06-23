import { useDispatch, useSelector } from 'react-redux';
import { isTimer } from '../../features/user/userSlice';
import LogoutButton from '../Auth/Logout/LogoutButton';
import styles from './Nav.module.css'
import bladesSvg from "../../img/svg/blades.svg";
import shieldSvg from "../../img/svg/shield.svg";
import flashSvg from "../../img/svg/flash.svg";

function Nav() {
  const user = useSelector((state) => state.user.user);
  const energy = useSelector((state) => state.user.user.energy);
  const time = useSelector((state) => state.user.user.time);

  const dispatch = useDispatch();

  let ATK;
  let DEF;
  if (user.weapons.length !== 0) {
    ATK = user.weapons.reduce((sum, weapon) => sum + weapon.ATK, 0)
    DEF = user.weapons.reduce((sum, weapon) => sum + weapon.DEF, 0)
  }

  return (
    <header>
      <div className={styles.container}>
        <div>
          <img alt={''} src={bladesSvg}/>
          {ATK ?? 0}</div>
        <div>
          <img alt={''} src={shieldSvg}/>
          {DEF ?? 0}</div>
        <div>
          <img alt={''} src={flashSvg}/>
          {user.energy} {user.energy < 20 && `energy gain in ${time}`}</div>
        <LogoutButton />
      </div>
    </header>
  );
}
export default Nav;
