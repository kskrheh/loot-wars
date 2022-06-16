import { useContext } from "react";
import AppContext from "../../context/AppContext";

const LogoutButton = () => {
  const {dispatch} = useContext(AppContext);
  const goLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('auth/logout', {
      method: 'delete',
      headers: {'Content-Type' : 'application/json'},
    });
    if(response.status === 200) {
      dispatch({type: 'LOGOUT_USER'})
    }
  }
  return (
    <button onClick={goLogout}>
      EXIT
    </button>
  );
};

export default LogoutButton;
