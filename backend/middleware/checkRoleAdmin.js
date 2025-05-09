const user = require("../model/User");

const checkRoleAdmin = async(userId) => {
        const userCurrent = await user.findById(userId)

        if(userCurrent.role !== "ADMIN"){
            return false
        }
        return true    
}

module.exports = checkRoleAdmin