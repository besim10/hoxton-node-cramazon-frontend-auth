function Register({ setModal, setUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          localStorage.token = data.token;
          setUser(data.user);
          setTimeout(() => {
            setModal("");
          }, 1000);
        }
      });
  };
  return (
    <div
      onClick={() => {
        setModal("");
      }}
      className="modal-wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <span
          onClick={() => {
            setModal("");
          }}
        >
          X
        </span>
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name: " name="name" required />
          <input type="email" placeholder="Email: " name="email" required />
          <input
            type="password"
            placeholder="Password: "
            name="password"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
export default Register;
