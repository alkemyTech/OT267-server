const findUsers = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    if (user !== null) {
        return user;
    } 
    return null;
} 

module.exports = { 
    findUsers
}