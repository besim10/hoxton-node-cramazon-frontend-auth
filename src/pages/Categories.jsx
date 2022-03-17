import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const randColour = () =>
  ["green", "red", "blue", "yellow"][Math.floor(Math.random() * 4)];
function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/categories")
      .then((resp) => resp.json())
      .then((categoriesFromServer) => setCategories(categoriesFromServer));
  }, []);
  return (
    <section className="categories-container main-wrapper">
      <ul className="categories-container__list">
        {categories.map((category) => (
          <li style={{ backgroundColor: `var(--${randColour()})` }}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Categories;
