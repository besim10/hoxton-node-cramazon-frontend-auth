import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const randColour = () =>
  ["green", "red", "blue", "yellow"][Math.floor(Math.random() * 4)];

function Header({ setModal, user, setUser }) {
  const navigate = useNavigate();
  return (
    <header
      className="header"
      // @ts-ignore
      style={{ ["--border-colour"]: `var(--${randColour()})` }}
    >
      <div className="header__logo" style={{ color: `var(--${randColour()})` }}>
        Hoxbay
      </div>
      <nav className="header__nav">
        <ul>
          <li>{<Link to="/products">Home</Link>}</li>
          <li>{<Link to="/categories">Categories</Link>}</li>
          {user !== null ? <li>{<Link to="/orders">Orders</Link>}</li> : null}
          {user === null ? (
            <li
              onClick={() => {
                setModal("log-in");
              }}
            >
              Log in
            </li>
          ) : (
            <li
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/products");
              }}
            >
              Sign Out
            </li>
          )}
          {user !== null ? (
            <li>
              <span style={{ fontWeight: "bold" }}>Welcome, {user.name}</span>
            </li>
          ) : (
            <li
              onClick={() => {
                setModal("register");
              }}
            >
              Register
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
