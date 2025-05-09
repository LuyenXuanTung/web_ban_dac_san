const jwt = require('jsonwebtoken');


async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token
        
        if(!token){
            return res.status(401).json({
                message: 'Vui lòng đăng nhập',
                data: [],
                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY,function(err, decoded){
            if(err){
                console.log("lỗi xác thực");
            }
            req.userId = decoded._id

            next()
        })
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}

module.exports = authToken