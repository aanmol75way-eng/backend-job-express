let express=require('express');
let mongoose=require('mongoose')
let cors=require('cors');
const { webRoutes } = require('./app/routes/web/webRoutes');
const { adminRoutes } = require('./app/routes/admin/adminRoutes');
let app=express()
app.use(express.json())
app.use(cors())
require('dotenv').config()

// admin
app.use('/admin',adminRoutes)
// login

app.use('/web',webRoutes)

const applicationRoutes = require("./app/routes/web/applicationRoutes");
app.use("/web/application", applicationRoutes);

// Serve uploads folder
app.use("/uploads", express.static("app/uploads"));
mongoose.connect(process.env.DBNAME)
    .then(() => {
        console.log('Database connected');

        // app.listen does NOT return a promise
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Database not connected', error);
    });