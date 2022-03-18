function FirstLogIn({ setModal }) {
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
        className="modal-container message"
      >
        <span
          onClick={() => {
            setModal("");
          }}
        >
          X
        </span>
        <h3>First Log in please...</h3>
      </div>
    </div>
  );
}
export default FirstLogIn;
