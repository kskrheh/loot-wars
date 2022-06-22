import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Loot from "./components/Loot/Loot";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser, increaseEnergy, isTimer, changeTime } from "./features/user/userSlice";
import { useEffect } from "react";
import Equipped from "./components/Equipped/Equipped";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena/Arena";

// eslint-disable-next-line no-unused-vars
import styles from "./App.module.css";

function App() {
  //saving situation
  const user = useSelector((state) => state.user);
  const timer = useSelector((state) => state.user.user.isTimer);
  const time = useSelector((state) => state.user.user.time);
  const energy = useSelector((state) => state.user.user.energy)
  const dispatch = useDispatch();

  // let startTime = 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('timer')
      dispatch(isTimer(true));
      dispatch(increaseEnergy());
    }, 60000);

    if (energy === 20) {
      console.log("CANCEL")
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [dispatch, timer, energy]);

  useEffect(()=> {
    const timeout = setInterval(() => {
      dispatch(changeTime())
    }, 1000)

    if (energy === 20) {
      clearInterval(timeout)
    }

    return () => clearInterval(timeout)
  }, [dispatch, time, energy])

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
