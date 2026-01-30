let express=require('express')
const { jobRoutes } = require('./jobRoutes')

let adminRoutes=express.Router()

adminRoutes.use('/job',jobRoutes)


module.exports={adminRoutes}