import { products, companies } from "./data";
import ProductList from "./ProductList";
import withToggles from "./HOC";



const ProductListWithToggles = withToggles(ProductList);

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <ProductListWithToggles title="Products" items={products} />
      </div>
    </div>
  );
}


