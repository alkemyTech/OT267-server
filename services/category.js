const { Category } = require('../models/index');

const categoryFindById = async (id) => await Category.findByPk(id, { 
        attributes: [
          'name',
          'description',
          'image'
        ]
      })

module.exports = {
    categoryFindById
}