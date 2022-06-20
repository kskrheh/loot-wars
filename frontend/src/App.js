import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Loot from "./components/Loot/Loot";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userSlice'
import { useEffect } from "react";
import Equipped from "./components/Equipped/Equipped";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena/Arena";

// eslint-disable-next-line no-unused-vars
import styles from "./App.css";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUser());
  }, [dispatch])

  return (
    <div>
      <header>
        {
          user.user.name && 
            <>
              <Nav />
              <Footer />
              
            </>
        }
        <Routes>
          <Route path='/' element={<Equipped />} />
          <Route path='/arena' element={<Arena />} />
          <Route path='/loot' element={<Loot />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
