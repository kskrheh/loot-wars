
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'


function Footer() {
 

  return (
     <footer>
       <nav>
         <ul>
          <li><Link to="home">⛺</Link></li>
          <li><Link to="/lopata">🪠</Link></li>
          <li><Link to="/mahach">⚔</Link></li>
          <li><Link to="/telegram">✉</Link></li>
          <li><Link to="/history">📖</Link></li>
         </ul>
       </nav>
     </footer>
  );
}

export default Footer;
