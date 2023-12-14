import React from 'react'

const ProductItem = ({ product }) => {
  return (
  <li className="product">
    <p className="product-name">{product.productName}</p>
    <p className="product-price">${product.price}</p>
    <p className="product-description">{product.description}</p>
  </li>
  )
}

export default ProductItem;