let express=require('express')
const { createJob, getAllJobs, updateJob, deleteJob, getSingleJob } = require('../../controllers/admin/jobpostControllers')

let jobRoutes=express.Router()

jobRoutes.post('/create',createJob)
jobRoutes.get('/view',getAllJobs)
jobRoutes.get('/singlejob/:id',getSingleJob)
jobRoutes.put('/update/:id',updateJob)
jobRoutes.delete('/delete/:id',deleteJob)

module.exports={jobRoutes}