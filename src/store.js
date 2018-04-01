import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const SET_CATEGORIES = 'set categories';
const CREATE_CATEGORY = 'create category';
const DELETE_CATEGORY = 'delete category';

const SET_PRODUCTS = 'set products';
const CREATE_PRODUCT = 'create product';
const DELETE_PRODUCT = 'delete product';

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      state = action.categories;
      break;
    case CREATE_CATEGORY:
      state = [...state, action.category];
      break;
    case DELETE_CATEGORY:
      state = state.filter(category => category.id !== action.id);
      break;
    default:
  }
  return state;
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product];
      break;
    case DELETE_CATEGORY:
      state = state.filter(product => product.categoryId !== action.id);
      break;
    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.id);
      break;
    default:
  }
  return state;
};

const reducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer
});

// CATEGORIES

const loadCategories = () => {
  return (dispatch) =>  {
    return axios.get('/api/categories')
    .then(result => result.data)
    .then( categories => dispatch({
      type: SET_CATEGORIES,
      categories
    }));
    // .then(categories => console.log('categories', categories));
  };
};

const createCategory = (_category) => {
  return (dispatch) => {
    return axios.post('/api/categories', _category)
    .then( result => result.data)
    .then( category => dispatch({
      type: CREATE_CATEGORY,
      category
    }));
  };
};

const deleteCategory = (id, history) => {
  return dispatch => {
    return axios.delete(`/api/categories/${id}`)
      .then(() => {
        console.log('api called and returned');
        return dispatch({
          type: DELETE_CATEGORY,
          id
        });
      });
  };
};

// PRODUCTS

const loadProducts = () => {
  return (dispatch) =>  {
    return axios.get('/api/products')
    .then(result => result.data)
    .then( products => dispatch({
      type: SET_PRODUCTS,
      products
    }));
    // .then(products => console.log('products', products));
  };
};

const createProduct = product => {
  console.log('product', product);
  return dispatch => {
    return axios.post('/api/products', product)
      .then(result => result.data)
      .then(() => dispatch({
        type: CREATE_PRODUCT,
        product
      }));
  };
};

const deleteProduct = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/products/${id}`)
    .then(() => dispatch({
      type: DELETE_PRODUCT,
      id
    }));
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { loadProducts, loadCategories, createCategory, deleteProduct, deleteCategory, createProduct };
