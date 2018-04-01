const router = require('express').Router();
const { Product, Category } = require('../db').models;


// get list of products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Category
    }]
  })
  .then(product => res.send(product))
  .catch(next);
});

// create products for particular category
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

// delete product
router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
