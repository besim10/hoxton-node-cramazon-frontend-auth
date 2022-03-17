import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail({ user, setUser, updateQuantity }) {
  const params = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8000/items/${params.title}`)
      .then((resp) => resp.json())
      .then((item) => setItem(item));
  }, []);

  const addOrderToServer = () => {
    fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({ userId: user.id, itemId: item.id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) console.log(error);
        else {
          setUser(data);
          navigate("/orders");
        }
      });
  };
  if (item === null) return <h1>Loading..</h1>;
  return (
    <main>
      <section className="product-detail main-wrapper">
        <img src={item.image} alt={item.title} />
        <div className="product-detail__side">
          <h3></h3>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>£{item.price} </p>
          <button
            onClick={() => {
              const match = user.orders.find(
                (order) => order.itemId === item.id
              );
              if (match) {
                if (match.quantity === 9) {
                  updateQuantity(match.id, match.quantity);
                } else {
                  updateQuantity(match.id, match.quantity + 1);
                }
              } else {
                addOrderToServer();
              }
            }}
          >
            Order now
          </button>
        </div>
      </section>
    </main>
  );
}
export default ProductDetail;
