import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import StudentModel from './models/student.models.js';

const app = express();
const port = process.env.PORT || 6000;
const db_connection_string = process.env.MONGODB_URI;

app.use(express.json());

app.post("/student/create", async(req, res)=> {
    try {
        const addedStudent = await StudentModel.create(req.body);
        res.status(201).json({ 
            message: "Student added!", 
            student: addedStudent 
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    }
});

app.post("/student/add", (req, res)=> {
    StudentModel.create(req.body)
    .then((addedStudent) => {
        console.log(addedStudent);
        res.status(201).json({ 
            message: "Student added!", 
            student: addedStudent
        });
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error adding student!" 
        });
    })
});

app.get("/student/list", async(req, res)=> {
    try {
        const allStudents = await StudentModel.find();
        res.status(200).json({ 
            message: "All students retrieved!", 
            students: allStudents 
        });   
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ 
            message: "Error retrieving students!" 
        });
    }
});
app.put('/student/:nationalId', async (req, res) => {
    const { fullName, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.nationalId,
        { fullName, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  app.delete('/student/:id', async (req, res) => {
    try {
      const deletedUser = await student.findByIdAndDelete(req.params.nationalId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
mongoose.connect(db_connection_string)
.then(() => {
    console.log("Connected to DB...");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((err) => {
    console.log(err);
});