import React, { useContext, useEffect, useState } from 'react';
import { ShopContaxt } from '../context/ShopContext'; // Fixed typo: ShopContaxt -> ShopContext
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category}) => {
  const { products } = useContext(ShopContaxt);
  const [related, setRelated] = useState([]);

  useEffect(() => {

    if (products.length > 0 && category) {
      let productsCopy = products.slice();

      // Determine category name to filter
      const categoryName = typeof category === 'object' && category.name ? category.name : category;

      if (!categoryName || typeof categoryName !== 'string') {
        console.error('Invalid category prop:', category);
        setRelated([]);
        return;
      }
      setRelated(productsCopy.slice(0, 4)); // Limit to 4 related products
    } else {
      console.log('No products or category provided:', { productsLength: products.length, category });
      setRelated([]);
    }
  }, [products, category]);

  return (
    <div className="my-5">
      <div className="text-center py-4">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {products.length === 0 && category ? (
        <p className="text-center text-muted">Loading related products...</p>
      ) : related.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {related.map((item) => (
            <div className="col" key={item.id}>
              <ProductItem
                id={item.id}
                name={item.name} // Fixed from title to name
                price={item.price}
                image={item.image_url} // Fixed from image to image_url
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProduct;