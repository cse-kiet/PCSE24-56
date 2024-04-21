const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

//signup schema
const personSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique:true
  },
  userid:{
    type:String,
    unique:true
  }
});
//form schema

const registerSchema=new mongoose.Schema({
  fname:String,
  lname:String,
  phone:String,
  uname:String,
  place:String,
  height:String,
  weight:String,
  blood:String,
  age:String,
  userid:String,
});
//pdf schema
const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  userid:{
    type:String,
    unique:true
  }
});
// Record schema information
const recordSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  userid:{
    type:String,
    unique:true
  }
});

// Appoinment scema
const noteSchema = new mongoose.Schema({
  doctorName: String,
  appointmentDate: String,
  appointmentTime: String,
  treatment: String,
  note: String,
   userid:{
    type:String,
    unique:true
  }
});

const Person = mongoose.model('Person', personSchema);

const Note = mongoose.model('Note', noteSchema);

const File = mongoose.model('File', fileSchema);

const Record = mongoose.model('Record', recordSchema);

const Form = mongoose.model('Form',registerSchema);

//mongodb connection
mongoose.connect('mongodb+srv://dr-report:RishabhAmmarHrishabh@cluster0.jkiogkb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

//signup user
app.post('/signup', async (req, res) => {
  try{
    console.log(req.body);
    const exist=await Person.findOne({username:req.body.username});
    if(exist)
     return res.status(401).json({message:'user already exist'});

  const data=req.body;
  const newUser=new Person(data);
  await newUser.save();
  res.status(200).json({message:data})
}catch(error){
  console.log(req.body);
    res.status(500).json({message:error.message});
}
});
//loginuser 
app.post('/login',async(req,res)=>{
  try{
    const username=req.body.username;
    const password=req.body.password;

    let user= await Person.findOne({username:username,password:password});
    if(user){
     return res.status(200).json({data:user});
    }
    else{
     return res.status(401).json(`Invalid login`);
    }
 }catch(error){
     res.status(500).json(`There is an error`,error.message);
 }
})
//form 

app.post('/form',async(req,res)=>{
  try{
    const user=req.body;
    const newUser=new Form(user);
    await newUser.save();
    res.status(200).json({message:user})
  }catch(error){
    console.log(req.body)
      res.status(500).json({message:error.message});
  }
});

app.get('/form/:id', async (req, res) => {
  try {
    const id=req.params.id;
    const files = await Form.find({userid:id});
    res.status(200).send(files);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Record search by doctorname, treatment and appoinment Date
app.get('/api/record-search', async (req, res) => {
  const { doctorName, treatment, filename, appointmentDate } = req.query;

  const filter = {};

  if (doctorName) {
    filter.doctorName = { $regex: doctorName, $options: 'i' };
  }
  if (treatment) {
    filter.treatment = { $regex: treatment, $options: 'i' };
  }
  if (filename) {
    filter.filename = { $regex: filename, $options: 'i' };
  }
  if (appointmentDate) {
    filter.appointmentDate = { $regex: appointmentDate, $options: 'i' };
  }

  try {
    const records = await Record.find(filter);
    res.send(records);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to search for records' });
  }
});


// get all appoinment details

app.get('/api/appoinment-search', async (req, res) => {
  const { doctorName, treatment, note, appointmentDate } = req.query;

  const filter = {};

  if (doctorName) {
    filter.doctorName = { $regex: doctorName, $options: 'i' };
  }
  if (treatment) {
    filter.treatment = { $regex: treatment, $options: 'i' };
  }
  if (note) {
    filter.note = { $regex: note, $options: 'i' };
  }
  if (appointmentDate) {
    filter.appointmentDate = { $regex: appointmentDate, $options: 'i' };
  }

  try {
    const appoinments = await Note.find(filter);
    res.send(appoinments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to search for appoinments' });
  }
});

// Add record to database
app.post('/api/add-record', upload.single('file'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  const { doctorName, appointmentDate, appointmentTime, treatment,userid } = req.body;

  if (!originalname || !buffer || !mimetype || !doctorName || !appointmentDate || !appointmentTime || !treatment || !userid) {
    return res.status(400).send({ message: 'Please fill in all required fields and select a file to upload' });
  }

  const record = new Record({
    doctorName,
    appointmentDate,
    appointmentTime,
    treatment,
    userid,
    filename: originalname,
    data: buffer,
    contentType: mimetype
  });

  try {
    await record.save();
    res.send({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save the appointment to the database' });
  }
});

// get records

app.get('/api/add-record/:uid', async (req,res) => {
  try {
    const uid=req.params.uid;
    const records = await Record.find({userid:uid});
    res.status(200).send(records);

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});


// get specific record like record-1 , record-2 with help of id


app.get('/api/add-record/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }
    res.status(200).send(record);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});


// edit the record with specific id


app.put('/api/editrecord/:id', upload.single('file'), async (req, res) => {
  const { doctorName, appointmentDate, appointmentTime, treatment } = req.body || {};
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: 'Record id is required' });
  }

  if (!req.file || !doctorName || !appointmentDate || !appointmentTime || !treatment) {
    return res.status(400).send({ message: 'Please fill in all required fields and select a file to upload' });
  }

  try {
    const record = await Record.findByIdAndUpdate(id, {
      doctorName,
      appointmentDate,
      appointmentTime,
      treatment,
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }

    res.send({ message: 'Record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to update the record' });
  }
});



// delete the record with id
app.delete('/api/delete-record/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }
    await Record.findByIdAndDelete(id);
    res.send({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete the record from the database' });
  }
});


// delete the appoinment appinments

app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    await Note.findByIdAndDelete(id);
    res.send({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete the record from the database' });
  }
});


// Create a new appointment


  app.post('/api/notes', async (req, res) => {
    try {
      console.log(req.body);
      const note = new Note(req.body);
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.get('/api/notes/:uid', async (req, res) => {
    try {
      const uid=req.params.uid;//receiving the unique id from logged in user collection
      const notes = await Note.find({userid:uid}).sort({_id: -1});
      res.send(notes);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // get specific appoinment with the help of id

  app.get('/api/notes/:id', async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send({ message: 'Note not found' });
      }
      res.send(note);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // update the appoinment

  app.put('/api/modifynotes/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!note) {
        return res.status(404).send({ message: 'Note not found' });
      }
      res.send(note);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  // get latest appoinment info


  app.get('/api/latest/:id', async (req, res) => {
    try {
      const id=req.params.id;
      const latestNote = await Note.find({userid:id}).sort({$natural:-1}).limit(1);
      res.send(latestNote);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // upload a pdf file
  

app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  if (!originalname || !buffer || !mimetype) {
    return res.status(400).send({ message: 'Please select a file to upload' });
  }

  const file = new File({
    filename: originalname,
    data: buffer,
    contentType: mimetype,
    userid:req.body.userid,
  });

  try {
    await file.save();
    res.status(201).send({ fileId: file._id });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// get all pdf files

app.get('/files/:id', async (req, res) => {
    try {
      const id=req.params.id;
      const files = await File.find({userid:id});
  
      res.status(200).send(files);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server error' });
    }
  });

// download a specific  pdf file

  app.get('/recordfiledownload/:fileId', async (req, res) => {
    const { fileId } = req.params;
  
    if (!fileId) {
      return res.status(400).send({ message: 'Please upload a file first' });
    }
  
    try {
      const record = await Record.findById(fileId);
  
      if (!record) {
        return res.status(404).send({ message: 'File not found' });
      }
  
      res.setHeader('Content-Type', record.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${record.filename}"`);
      res.send(record.data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server error' });
    }
  });

  // get a specific pdf file with id


app.get('/download/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).send({ message: 'Please upload a file first' });
  }

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }

    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(file.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// delete the file with specific id

app.delete('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).send({ message: 'File ID is missing' });
  }

  try {
    const file = await File.findByIdAndDelete(fileId);

    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }

    res.status(200).send({ message: 'File deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});


// app listen 

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
