import { products, companies } from "./data";
import List from "./List";

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List title="Products" items={products} />
      </div>
    </div>
  );
}


