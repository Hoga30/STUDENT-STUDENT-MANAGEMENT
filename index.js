import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.models';
const app = express();
const port = process.env.PORT || 3000;
const db_connection_string = process.env.MONGODB_URI;
app.use(express.json());
app.post("/student/add",async(req,res)=>{
    try{
const addedStudent = await StudentModel.create(req.body)
res.status(201).json({
mesage: "Student added!",
student: addedStudent})

} catch(err){

    console.log(err.message);
    res.status(500).json({
        message:"Error adding student"});
}
});


mongoose.connect(db_connection_string)
.then(()=>{
console.log(" successfully connected to DB...");
})
.catch((err)=>{
console.log(err);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
