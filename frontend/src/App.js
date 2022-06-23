import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Loot from "./components/Loot/Loot";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser, increaseEnergy, isTimer, changeTime, gainTimeMinute, errorEnergyMessage } from "./features/user/userSlice";
import { useEffect } from "react";
import Equipped from "./components/Equipped/Equipped";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena/Arena";

// eslint-disable-next-line no-unused-vars
import styles from "./App.module.css";

function App() {
  //saving situation
  const user = useSelector((state) => state.user);
  const gainTimerOn = useSelector((state) => state.user.user.isTimer);
  const gainTime = useSelector((state) => state.user.user.time);
  const energy = useSelector((state) => state.user.user.energy)
  const dispatch = useDispatch();

useEffect(() => {
  if (energy < 20) {
    if (!gainTimerOn) {
      dispatch(isTimer(true));
      dispatch(gainTimeMinute())
    }
  } else if (energy === 20) {
    if (gainTimerOn) {
    dispatch(isTimer(false));
    }
  }
}, [energy < 20])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(gainTimerOn) {
      dispatch(changeTime());
      }
    }, 1000)
    if (gainTime === 0) {
      dispatch(increaseEnergy());
      dispatch(errorEnergyMessage(false))
      dispatch(gainTimeMinute())
    }
    return () => clearTimeout(timeout)
  }, [gainTimerOn, gainTime, dispatch])

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <header className={styles.app}>
        {user.user.name && (
          <>
            <Nav />
            <Footer />
          </>
        )}
        <div className={styles.appa}>
          <Routes>
            <Route path="/" element={<Equipped />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/loot" element={<Loot />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
