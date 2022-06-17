import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./components/auth/RegistrationForm";
import LogoutButton from "./components/auth/LogoutButton";
import LoginForm from "./components/auth/LoginForm";
import Loot from "./components/Loot/Loot";

function App() {
  return (
    <div>
      <header>
        <Nav />
        <RegistrationForm/>
        <LogoutButton />
        <LoginForm />
        <Footer />
        <Loot/>
      </header>
    </div>
  );
}

export default App;
