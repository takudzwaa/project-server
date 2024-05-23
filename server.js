import express, { json } from 'express';
import Registration from './models/Registration.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import productRouter from './routes/product.js';

dotenv.config();
const app = express();

app.use(json()); // for parsing application/json

// Middleware configuration
app.use(express.json());
app.use(session({
  secret: 'uihuiiua$@#hi83998h27hiay3!!h4$suib8&huhsqqpk3nvmz>j',
  resave: false,
  saveUninitialized: false
}));

// Connect to MongoDB
process.env.OPENSSL_CONF = "";

mongoose.connect('mongodb://localhost:27017/my_DB')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/products', productRouter);

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    const user = new Registration({ username, email, password });
  
    user.save()
      .then(() => res.status(201).send('User registered successfully'))
      .catch(err => res.status(500).send('Server error: ' + err));
  });

  app.get('/users', (req, res) => {
  Registration.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send('Server error: ' + err));
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, (err) => {
  if(err){
    console.log('Error running sever: ', err)
  }
  console.log(`Server is running on port ${PORT}`);
});