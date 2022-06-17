import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./components/auth/RegistrationForm";
import LogoutButton from "./components/auth/LogoutButton";
import LoginForm from "./components/auth/LoginForm";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { auth } from './features/user/userSlice'
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch('/auth/info');
      const user = await response.json();
      dispatch(auth(user));
    }
  
    fetchUserInfo()
  }, [dispatch])

  return (
    <div>
      <header>
        {
          user.user ? 
            <>
              <Nav />
              <LogoutButton />
              <Footer />
            </>
            
          : 
            <>
              <RegistrationForm/>
              <LoginForm />
            </>
        }
      </header>
    </div>
  );
}

export default App;
