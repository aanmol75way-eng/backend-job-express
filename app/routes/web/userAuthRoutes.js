let express=require('express')
const { registerUser, userLogin } = require('../../controllers/web/userAuthController')
let userAuthRouter=express.Router()

userAuthRouter.post('/register',registerUser)
userAuthRouter.post('/login',userLogin)

module.exports={userAuthRouter}
