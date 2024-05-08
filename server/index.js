const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//const userRoutes = require('./routes/userRoutes'); 
const adminRoutes=require('./routes/adminRoutes');
const individualRoutes=require('./routes/IndividualRoutes');
const organizationRoutes=require('./routes/organizationRoutes');
const materialRoutes=require('./routes/materialRoutes');
const requestRoutes=require('./routes/requestRoutes');
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
dotenv.config({ path: './config.env' })

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));


app.use('/api', express.json());

app.use('/api', adminRoutes);
app.use('/api',individualRoutes);
app.use('/api',organizationRoutes);
app.use('/api',materialRoutes);
app.use('/api',requestRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
