const Admin = require('../models/Admin');

const Individual = require('../models/Individual');
const Organization = require('../models/Organization');

const JWT=require("jsonwebtoken");
const bcrypt=require('bcrypt');

const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName,username, email, password } = req.body;
    
    const oldUser=await Admin.findOne({email})
    if (oldUser){
            return res.status(400).send("Admin Already Exist. Please Login")

    }
    
    const salt=await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword= await bcrypt.hash(password,salt);
    let newAdmin=new Admin({
            firstName,
            lastName,
            username,
            email:email.toLowerCase(),
            password:hashedPassword
    });

    const token=JWT.sign(
            {userId:newAdmin._id,email},
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn:'24h',
            },
    );
    newAdmin.token=token;
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'An error occurred while registering admin' });
  }
};

const loginAdmin = async (req, res) => {
  try{
        const {email , password}=req.body;
        if (!(email && password)){
            res.status(401).send('All data are required');

        }
        
        const admin= await  Admin.findOne({email});
        if (admin && ( await bcrypt.compare(password,admin.password))){
            const email=admin.email;
            const token =JWT.sign(
                {user_id:admin._id,email},
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn:"24h"
                },

            );
            
            admin.token=token;
            //await admin.save();
            const responseData = {
              admin: admin.toObject(), 
              token
            };
            return res.status(200).json({ message: 'Login successful', result: true, data:responseData });
        } else {
          return res.status(401).json({ message: 'Invalid email or password', result: false, data: null });
        }
   
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error', result: false, data: null });

  }
};
            
      


/*const logoutAdmin = async (req, res) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = JWT.verify(token, process.env.TOKEN_SECRET_KEY);
    const adminId = decodedToken.user_id;
    await Admin.updateOne({ _id: adminId }, { $unset: { token: "" } });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out admin:', error);
    res.status(500).json({ error: 'An error occurred while logging out admin' });
  }
};*/

const logoutAdmin = async (req, res) => {
  try {
      res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out admin:', error);
    res.status(500).json({ error: 'An error occurred while logging out admin' });
  }
};







const getAdminDetail = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error getting admin detail:', error);
    res.status(500).json({ error: 'An error occurred while getting admin detail' });
  }
};

const updateAdminDetail = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const { firstName, lastName,username, email, password} = req.body; 
    const salt=await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword= await bcrypt.hash(password,salt);
    const admin = await Admin.findByIdAndUpdate(adminId, { firstName, lastName,username, email:email.toLowerCase(), password:hashedPassword}, { new: true });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error updating admin detail:', error);
    res.status(500).json({ error: 'An error occurred while updating admin detail' });
  }
};


const addUser = async (req, res) => {
  try {
    const { userDetails,role } = req.body;
    let newUser;
    if (role === 'individual') {
      const {firstName,lastName,username,email,password,role,imageUrl}=req.body;
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password,salt);
      newUser = new Individual({
        firstName,
        lastName,
        username,
        email:email.toLowerCase(),
        password:hashedPassword,
        role,
        imageUrl
      });
    } else if (role === 'organization') {
      const { name,email,password,role } = req.body;
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword= await bcrypt.hash(password,salt)
      newUser = new Organization({
        name,
        email:email.toLowerCase(),
        password:hashedPassword,
        role});
    } else {
      return res.status(400).json({ error: 'Invalid user role' });
    }
   
    const userToken = JWT.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    );
    newUser.token=userToken;
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', token: userToken });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding user' });
  }
};
const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
     const { role } = req.query;
    let user;
    if (role === 'individual') {
      user = await Individual.findByIdAndDelete(userId);
    } else if (role === 'organization') {
      user = await Organization.findByIdAndDelete(userId);
    } else {
      user = null;
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({ error: 'An error occurred while removing user'});
  }
};

const modifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, userDetails } = req.body;
    let user;
    if (role === 'individual') {
      const {firstName,lastName,username,email,password,role,imageUrl}=req.body;
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword= await bcrypt.hash(password,salt); 
      user = await Individual.findByIdAndUpdate(userId, {firstName,lastName,username,email:email.toLowerCase(),password:hashedPassword,role,imageUrl}, { new: true });
    } else if (role === 'organization') {
      const { name,email,password,role } = req.body;
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword= await bcrypt.hash(password,salt);
      user = await Organization.findByIdAndUpdate(userId, {name,email:email.toLowerCase(),password:hashedPassword,role}, { new: true });
    } else {
      return res.status(400).json({ error: 'Invalid user role' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User details modified successfully', user });
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(500).json({ error: 'An error occurred while modifying user' });
  }
};

module.exports={
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  modifyUser,
  addUser,
  getAdminDetail,
  updateAdminDetail,
  removeUser
}