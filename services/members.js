
const { Member } = require('../models/index');


const list = async () => await Member.findAll()

module.exports = {
    list
}