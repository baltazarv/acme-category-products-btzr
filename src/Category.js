import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { deleteCategory, createProduct } from './store';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      categoryProducts: []
    };
    this.postProduct = this.postProduct.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }
  componentWillMount() {
    this.setState({
      name: this.getName(this.props),
      categoryProducts: this.getProducts(this.props)
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: this.getName(nextProps),
      categoryProducts: this.getProducts(nextProps)
    });
  }
  getName(props) {
    if (props.categories.length) {
      return props.categories.find(category => category.id === props.id).name;
    }
    return '';
  }
  getProducts(props) {
    if (props.products.length) {
      const products = props.products.filter(product => product.categoryId === props.id);
      return products;
    }
    return [];
  }
  postProduct() {
    const name = Math.floor(Math.random() * 999) + 1;
    const product = { name: `${ name }-Product`, categoryId: this.props.id };
    this.props.createProduct(product);
  }
  deleteCategory() {
    this.props.history.push('/');
    this.props.deleteCategory(this.props.id);
  }
  render() {
    const { name, categoryProducts } = this.state;
    const { id } = this.props;
    const { postProduct, deleteCategory } = this;
    return (
      <div>
        <h3>{ name } <button onClick={ () => deleteCategory(id) }>- Delete -</button></h3>
        <button onClick={ postProduct }>+ Add Product +</button>
        <ul>
        {
          categoryProducts && categoryProducts.map(product => {
            return (
              // why no key showing up?!
              <li key={ product.id }>{ product.name }</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
    createProduct: product => dispatch(createProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
