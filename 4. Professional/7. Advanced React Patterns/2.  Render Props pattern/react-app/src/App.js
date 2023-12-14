import { products, companies } from "./data";
import ProductItem from './ProductItem';
import CompanyItem from "./CompanyItem";
import List from "./List";


export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List title="Products" items={products} render={(product) => (<ProductItem key={product.productName} product={product} />)} />
        <List title="Companies" items={companies} render={(company) => (<CompanyItem key={company.companyName} company={company} defaultVisibility={false} />)} />
      </div>
    </div>
  );
}


