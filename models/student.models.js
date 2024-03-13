import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
    fullNames:{
        type: 'String',
        required: true
    },
    email:{
        type: 'String',
        required: true,
        unique: true
    },
    phone:{
        type: 'String',
        required: true
    },
    nationalId:{
        type: 'String',
        required: true,
        unique: true
    },
    gender:{
        type: 'String',
        required: true,
        enum: {
            values: ['Male','Female'],
            message:'gender must be Male or Female'
        }
    }
},{timestamps: true});
const StudentModel = mongoose.model('student',StudentSchema);
export default StudentModel;