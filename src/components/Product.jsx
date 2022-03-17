import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Link to={`/products/${product.title}`}>
      <li>
        <article className="product-item">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
        </article>
      </li>
    </Link>
  );
}
export default Product;
