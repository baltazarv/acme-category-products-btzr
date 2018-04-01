import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from './store';

const Products = ({ products, deleteProduct }) => {
  return (
    <div>
      <h3>All Products ({ products.length })</h3>
      <ul>
      {
        products.length && products.map( product => {
          return (
            <li key={ product.id }><strong>{ product.name }</strong> <button onClick={ () => deleteProduct(product.id) }>x Delete x</button><br />
            { product.category.name }</li>
          );
        })
      }
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: productId => dispatch(deleteProduct(productId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
