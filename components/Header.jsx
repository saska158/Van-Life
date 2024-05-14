import { Link, NavLink } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"//vite is handling this when bundling

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
          <NavLink 
             to='/host'
             style={({isActive}) => isActive ? activeStyles : null}
          >
            Host
          </NavLink>
          <NavLink 
             to="/about"
             style={({isActive}) => isActive ? activeStyles : null}
          >
            About
          </NavLink>
          <NavLink 
             to="/vans"
             style={({isActive}) => isActive ? activeStyles : null}
          >
            Vans
          </NavLink>
          <Link to="login" className="login-link">
            <img 
              src={imageUrl} //vite is handling this when bundling
              className="login-icon"
            />
          </Link>
        </nav>
      </header>
    )
}