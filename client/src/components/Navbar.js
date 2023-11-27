import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };
  return (
    <div className="navbar">
      <NavLink activeClassName="active" className="navbar-link" to={"/"}>
        Home
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navbar-link"
        to={"/create-recipe"}
      >
        Create Recipe
      </NavLink>

      {!cookies.access_token ? (
        <NavLink activeClassName="active" className="navbar-link" to={"/auth"}>
          Login/Register
        </NavLink>
      ) : (
        <>
          <NavLink
            activeClassName="active"
            className="navbar-link"
            to={"/saved-recipes"}
          >
            Saved Recipes
          </NavLink>
          <button className="navbar-link" id="logout-button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};
