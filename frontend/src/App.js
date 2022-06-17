import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import LogoutButton from "./components/auth/LogoutButton";
import Loot from "./components/Loot/Loot";
import RegistrationForm from "./components/Auth/Registration/RegistrationForm";
import LoginForm from "./components/Auth/Login/LoginForm";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { auth } from './features/user/userSlice'
import { useEffect } from "react";
import Equipped from "./components/Equipped/Equipped";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena/Arena";

import styles from './App.css'

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch('http://localhost:4000/auth/info', {
        credentials: 'include'
      });
      const user = await response.json();
      dispatch(auth(user));
    }
  
    fetchUserInfo()
  }, [dispatch])

  return (
    <div>
      <header>
        <Nav />
        <RegistrationForm/>
        <LogoutButton />
        <LoginForm />
        <Footer />
        <Loot/>
        {
          user.user && 
            <>
              <Nav />
              <Footer />
            </>
        }
        <Routes>
          <Route path='/' element={<Equipped />} />
          <Route path='/arena' element={<Arena />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
