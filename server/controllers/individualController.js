const Individual = require('../models/Individual');

const JWT=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const loginIndividual = async (req, res) => {
  try{
        const {email , password}=req.body;
        if (!(email && password)){
            res.status(401).send('All data are required');

        }
        
        const individual= await  Individual.findOne({email});
        if (individual && ( await bcrypt.compare(password,individual.password))){
            const email=individual.email;
            const token =JWT.sign(
                {user_id:individual._id,email},
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn:"24h"
                },

            );
            
            individual.token=token;
            const responseData = {
              individual : individual.toObject(), 
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


const getIndividualDetail = async (req, res) => {
  try {
    const individualId = req.params.individualId;
    const individual = await Individual.findById(individualId);
    if (!individual) {
      return res.status(404).json({ error: 'Individual not found' });
    }
    res.status(200).json(individual);
  } catch (error) {
    console.error('Error getting individual detail:', error);
    res.status(500).json({ error: 'An error occurred while getting individual detail' });
  }
};

const editIndividual = async (req, res) => {
  try {
    const individualId = req.params.individualId;
    const  { firstName, lastName,username, email, password } = req.body;
    const salt=await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword= await bcrypt.hash(password,salt);
    const individual = await Individual.findByIdAndUpdate(individualId,  { firstName, lastName,username, email:email.toLowerCase(), password:hashedPassword }, { new: true });
    if (!individual) {
      return res.status(404).json({ error: 'Individual not found' });
    }
    res.status(200).json({ message: 'Individual details modified successfully', individual });
  } catch (error) {
    console.error('Error editing individual:', error);
    res.status(500).json({ error: 'An error occurred while editing individual' });
  }
};


const logoutIndividual = async (req, res) => {
  try {
    
    
    res.status(200).json({ message: 'Individual logged out successfully' });
  } catch (error) {
    console.error('Error logging out individual:', error);
    res.status(500).json({ error: 'An error occurred while logging out individual' });
  }
};

const getAllIndividuals= async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json(individuals);
  } catch (error) {
    console.error('Error fetching all individuals:', error);
    res.status(500).json({ error: 'An error occurred while fetching all individuals' });
  }
};

const deleteAllIndividuals = async (req, res) => {
  try {
    
    await Individual.deleteMany({});
    res.status(200).json({ message: 'All individual records deleted successfully' });
  } catch (error) {
    console.error('Error deleting individuals:', error);
    res.status(500).json({ error: 'An error occurred while deleting individuals' });
  }
};
module.exports = {
  loginIndividual,
  editIndividual,
  logoutIndividual,
  getIndividualDetail,
  getAllIndividuals,
  deleteAllIndividuals
};