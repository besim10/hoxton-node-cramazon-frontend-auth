import { useEffect, useState } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Modals from "./components/Modals/Modals";
import Orders from "./pages/Orders";
import Categories from "./pages/Categories";
import CategoriesDetails from "./pages/CategoriesDetails";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((resp) => resp.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);
  useEffect(() => {
    if (localStorage.token)
      fetch("http://localhost:8000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) console.log(data);
          else {
            setUser(data);
          }
        });
  }, []);
  function updateQuantity(orderId, newQuantity) {
    // update order on server
    fetch(`http://localhost:8000/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newQuantity: newQuantity }),
    })
      .then((resp) => resp.json())
      // update state
      .then((updatedUser) => {
        setUser(updatedUser);
        navigate("/orders");
      });
  }
  return (
    <div className="App">
      <Modals modal={modal} setModal={setModal} setUser={setUser} />
      <Header setModal={setModal} user={user} setUser={setUser} />
      <main>
        {
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route
              path="/products/:title"
              element={
                <ProductDetail
                  user={user}
                  setUser={setUser}
                  updateQuantity={updateQuantity}
                  setModal={setModal}
                />
              }
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:name" element={<CategoriesDetails />} />
            <Route
              path="/orders"
              element={
                <Orders
                  user={user}
                  setUser={setUser}
                  updateQuantity={updateQuantity}
                />
              }
            />
          </Routes>
        }
      </main>
    </div>
  );
}

export default App;
