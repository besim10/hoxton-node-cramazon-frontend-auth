import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

function CategoriesDetails() {
  const [products, setProducts] = useState([]);
  const param = useParams();

  useEffect(() => {
    fetch(`http://localhost:3002/products?categoryId=${param.id}`)
      .then((resp) => resp.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);
  return <ProductList products={products} />;
}
export default CategoriesDetails;
