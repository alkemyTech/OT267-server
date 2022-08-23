const { Organization } = require('../models');

module.exports={
    getAllOrg : async (req, res) => {
        const allOrg = await Organization.findAll({
            attributes : ['name', 'image', 'phone', 'address']
        });
        return res.json(allOrg);
    },

}