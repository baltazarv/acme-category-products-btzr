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

Category.hasMany(Product);
Product.belongsTo(Category);

const randoName = (suffix) => {
  var prefix = Math.floor(Math.random() * 999) + 1;
  return `${prefix}-${suffix}`;
};

const seed = () => {
  for (var i = 1; i < 4; i++) {
    Category.create({ name: randoName('Category')})
    .then(category => {
      let numProducts = Math.floor(Math.random() * 5) + 1;
      for (var i = 1; i < numProducts; i++) {
        Product.create({ name: randoName('Product')})
        .then(product => product.setCategory(category));
      }
    });
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
