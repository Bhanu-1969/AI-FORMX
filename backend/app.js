const express=require('express')
const app=express()
const cors=require('cors')
const connectDB=require('./db/connect')
const forms=require('./routes/forms')
require('dotenv').config()
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/api/forms',forms)



const start =async()=>{
try{
    await connectDB(process.env.MONGO_URL)
    app.listen(3000)
}catch(error){
    console.log(error)
}
}
start()