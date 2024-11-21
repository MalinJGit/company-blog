import { Link } from 'react-router-dom';
import './Header.css'; // Importera din CSS-fil här

function Header() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Hem</Link>
                </li>
                <li>
                    <Link to="/add">Lägg till inlägg</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
