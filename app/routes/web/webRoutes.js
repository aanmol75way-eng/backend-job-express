let express=require('express')
const { userAuthRouter } = require('./userAuthRoutes')
const applicationRoutes = require('./applicationRoutes')
let webRoutes=express.Router()

webRoutes.use('/auth',userAuthRouter)
webRoutes.use('/application',applicationRoutes)

module.exports={webRoutes}