import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
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
    <div className="navbar ">
      <Link className="underline decoration-sky-500" to={"/"}>
        Home
      </Link>
      <Link to={"/create-recipe"}>Create Recipe</Link>

      {!cookies.access_token ? (
        <Link to={"/auth"}>Login/Register</Link>
      ) : (
        <>
          <Link to={"/saved-recipes"}>Saved Recipes</Link>
          <button
            className="bg-[#a6c1ee] text-white rounded-full"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};
