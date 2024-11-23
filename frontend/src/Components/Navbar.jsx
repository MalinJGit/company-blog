import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar-menu">
            <ul className="nav-links">
                <li>
                    <Link to="/">Hem</Link>
                </li>
                <li>
                    <Link to="/add">Lägg till inlägg</Link>
                </li>
                <li>
                    <Link to="/about">Om oss</Link>
                </li>
                <li>
                    <Link to="/contact">Kontakt</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;