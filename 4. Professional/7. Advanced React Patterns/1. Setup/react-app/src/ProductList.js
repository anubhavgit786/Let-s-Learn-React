import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ title, items }) => 
{
  return (
    <ul className="list">
        {items.map((product) => (
          <ProductItem key={product.productName} product={product} />
        ))}
      </ul>
  )
}

export default ProductList;