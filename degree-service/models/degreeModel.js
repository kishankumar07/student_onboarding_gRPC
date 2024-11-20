import mongoose from 'mongoose';


const degreeSchema = new mongoose.Schema({
    degreeId: { 
      type: Number,
       required: true
     },
    title: { 
      type: String,
       required: true 
     },
    major: { type: String,
       required: true }
});


const Degree = mongoose.model('Degree', degreeSchema);

export default Degree;
