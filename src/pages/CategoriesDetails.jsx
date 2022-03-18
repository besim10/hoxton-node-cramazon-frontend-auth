import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

function CategoriesDetails() {
  const [products, setProducts] = useState([]);
  const param = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/categories/${param.name}`)
      .then((resp) => resp.json())
      .then((productsFromServer) => setProducts(productsFromServer.items));
  }, []);

  return <ProductList products={products} />;
}
export default CategoriesDetails;
