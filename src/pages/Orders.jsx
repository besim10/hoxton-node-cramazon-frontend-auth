import { useEffect, useState } from "react";

function Orders({ user, setUser, updateQuantity }) {
  // const [orders, setOrders] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3002/basket")
  //     .then((resp) => resp.json())
  //     .then((basketFromServer) => setBasket(basketFromServer));
  // }, []);
  if (user === null) return <h1>Loading..</h1>;
  function getTotal() {
    let total = 0;

    for (const order of user.orders) {
      total += order.quantity * order.item.price;
    }

    return total.toFixed(2);
  }
  // function updateQuantity(order, newQuantity) {
  //   // make a copy of the data
  //   let basketCopy = JSON.parse(JSON.stringify(basket));

  //   if (newQuantity > 0) {
  //     // update the data
  //     const match = basketCopy.find((target) => target.id === item.id);
  //     match.quantity = newQuantity;
  //   } else {
  //     // remove it from basket
  //     basketCopy = basketCopy.filter((target) => target.id !== item.id);
  //   }

  //   // update state
  //   setBasket(basketCopy);
  // }

  function deleteOrder(orderId) {
    fetch(`http://localhost:8000/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setUser(data);
        }
      });
  }
  return (
    <section className="basket-container">
      <h2>Your Orders</h2>
      <ul>
        {user.orders.map((order) => (
          <li key={order.item.id}>
            <article className="basket-container__item">
              <img src={order.item.image} alt={order.item.title} width="90" />
              <p>{order.item.title}</p>
              <p>
                Qty:
                <select
                  defaultValue={order.quantity}
                  onChange={(e) => {
                    if (Number(e.target.value) === 0) deleteOrder(order.id);
                    else {
                      updateQuantity(order.id, Number(e.target.value));
                    }
                  }}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </p>
              {/* <!-- The item total is calculated using the Qty selected value --> */}
              <p>
                Item total: £{(order.item.price * order.quantity).toFixed(2)}
              </p>
            </article>
          </li>
        ))}

        {/* <!--  --> */}
      </ul>
      {/* <!-- Basket total is calculated using each item's total from above --> */}
      <h3>Your total: £{getTotal()}</h3>
    </section>
  );
}
export default Orders;
