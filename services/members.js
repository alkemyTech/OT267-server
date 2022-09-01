const { Member } = require('../models/member');

const list = async () => await Member.findAll()

module.exports = {
    list
}