import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCategory } from './store';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.postCategory = this.postCategory.bind(this);
  }
  postCategory() {
    const name = Math.floor(Math.random() * 999) + 1;
    const category = { name: `${ name }-Category` };
    this.props.createCategory(category);
  }
  render() {
    const { categories, products } = this.props;
    const { postCategory } = this;
    return (
      <div>
        <h2>Categories <button onClick={ postCategory }>+ Add +</button></h2>
        <ul>
          <p><Link to="/products">All Products ({ products.length })</Link></p>
          {
            categories.length && categories.map( category => {
              return (
                // key not showing up here either!!
                // and not updating when adding or deleting categories!!!
                <li key={ category.id }><Link to={`/category/${ category.id }`}>{ category.name } ({ category.products ? category.products.length : 0 })</Link></li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: category => dispatch(createCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
