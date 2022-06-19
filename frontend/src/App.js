import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./components/auth/RegistrationForm";
import LogoutButton from "./components/auth/LogoutButton";
import LoginForm from "./components/auth/LoginForm";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userSlice'
import { useEffect } from "react";
import Equipped from "./components/Equipped/Equipped";
import { Routes, Route } from "react-router-dom";
import Arena from "./components/Arena/Arena";

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
          user.user ? 
            <>
              <Nav />
              <LogoutButton />
              <Equipped />
              <Footer />
            </>
          : 
            <>
              <RegistrationForm/>
              <LoginForm />
            </>
        }
        <Routes>
          <Route path='/arena' element={<Arena />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
