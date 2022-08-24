const { Organization } = require('../models');

module.exports={
    getAllOrg : async (req, res) => {
        try{

            const allOrg = await Organization.findAll({
                attributes : ['name', 'image', 'phone', 'address']
            });
            return res.json({
                message : 'Public data',
                data : allOrg
            });
        } catch(e) {
            return res.sendStatus(500);
        }
    },

}