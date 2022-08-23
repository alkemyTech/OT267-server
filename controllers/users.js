const {deleteUser} = require('../services/user')

const deleteSingleUser = async (_req, res, next) => {
    const {id} = _req.params
    const response = await deleteUser(id)
    
    if(response === 0) return res.status(404).json({
	status: 404,
	message: 'user does not exist'
    })

    res.status(200).json({ 
        message : 'user deleted'
    })
}; 

module.exports = {
    deleteSingleUser
}