const router = require('express').Router();
const { Category, Product } = require('../db').models;

// get list of categories
router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{
      model: Product
    }]
  })
  .then(category => res.send(category))
  .catch(next);
});

// create category with no products
router.post('/', (req, res, next) => {
  // console.log('create cat');
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next);
});

// delete category and all associated products
router.delete(`/:id`, (req, res, next) => {
  // console.log('del category', req.params.id);
  Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
