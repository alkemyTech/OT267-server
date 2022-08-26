const { Category } = require('../models/index');

const categoryFindById = async (id) => {
    
    const category = await Category.findByPk(id, { 
        attributes: [
          'name',
          'description',
          'image'
        ]
      })
    return category;
}

module.exports = {
    categoryFindById
}