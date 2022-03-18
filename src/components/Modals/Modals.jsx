import FirstSignIn from "./FirstLogIn";
import LogIn from "./LogIn";
import Register from "./Register";

function Modals({ modal, setModal, setUser }) {
  switch (modal) {
    case "log-in":
      return <LogIn setUser={setUser} setModal={setModal} />;
    case "register":
      return <Register setUser={setUser} setModal={setModal} />;
    case "firstLog-in":
      return <FirstSignIn />;
    default:
      return null;
  }
}
export default Modals;
