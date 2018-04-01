import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCategories, loadProducts } from './store';
import Categories from './Categories';
import Products from './Products';
import Category from './Category';

class App extends Component {
  componentWillMount() {
    this.props.loadCategories();
    this.props.loadProducts();
  }
  render() {
    return (
      <Router>
        <div>
          <h1>ACME Categories &amp; their Products</h1>
          <Route path="/" component={ Categories } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/category/:id" render={ ({ match, history }) => <Category id={ match.params.id * 1 } history={ history } /> } />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadProducts: () => dispatch(loadProducts())
  };
};

export default connect(null, mapDispatchToProps)(App);
