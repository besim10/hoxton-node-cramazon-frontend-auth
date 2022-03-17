import Product from "../components/Product";
import ProductList from "../components/ProductList";

function Products({ products }) {
  return (
    <section className="products-container main-wrapper">
      <ProductList products={products} />
    </section>
  );
}
export default Products;
