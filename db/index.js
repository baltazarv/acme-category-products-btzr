const conn = require('./conn');
const { Sequelize } = conn;

const sync = () => {
  return conn.sync({ force: true });
};

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING
  }
});

const Product = conn.define('product', {
  name: Sequelize.STRING
});

const randoName = (suffix) => {
  var prefix = Math.floor(Math.random() * 999) + 1;
  return `${prefix}-${suffix}`;
};

const seed = () => {
  for (var i = 1; i < 5; i++) {
    Product.create({ name: randoName('Product')});
    if (i % 2 === 0) {
      Category.create({ name: randoName('Category')});
    }
  }
};

module.exports = {
  sync,
  seed,
  models: {
    Category,
    Product
  }
};
