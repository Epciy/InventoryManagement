const Organization = require('../models/Organization');
const JWT=require("jsonwebtoken");
const bcrypt=require('bcrypt');

const loginOrganization = async (req, res) => {
  try{
        const {email , password}=req.body;
        if (!(email && password)){
            res.status(401).send('All data are required');

        }
        
        const organization= await  Organization.findOne({email});
        if (organization && ( await bcrypt.compare(password,organization.password))){
            const email=organization.email;
            const token =JWT.sign(
                {user_id:organization._id,email},
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn:"24h"
                },

            );
            
            organization.token=token;
            const responseData = {
              organization : organization.toObject(), 
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


const getOrganizationDetail = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    console.error('Error getting organization detail:', error);
    res.status(500).json({ error: 'An error occurred while getting organization detail' });
  }
};

const editOrganization = async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const { name, email, password } = req.body;
    const salt=await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword= await bcrypt.hash(password,salt);
    const   organization= await Organization.findByIdAndUpdate(organizationId,{ name, email:email.toLowerCase(), password:hashedPassword }, { new: true });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization details modified successfully', organization });
  } catch (error) {
    console.error('Error editing organization:', error);
    res.status(500).json({ error: 'An error occurred while editing organization' });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching all organizations:', error);
    res.status(500).json({ error: 'An error occurred while fetching all organizations' });
  }
};

const logoutOrganization = async (req, res) => {
  try {
    res.status(200).json({ message: 'Organization logged out successfully' });
  } catch (error) {
    console.error('Error logging out organization:', error);
    res.status(500).json({ error: 'An error occurred while logging out organization' });
  }
};

const deleteAllOrganizations = async (req, res) => {
  try {
    
    await Organization.deleteMany({});
    res.status(200).json({ message: 'All Organizations records deleted successfully' });
  } catch (error) {
    console.error('Error deleting Organizations:', error);
    res.status(500).json({ error: 'An error occurred while deleting Organizations' });
  }
};

module.exports={
  loginOrganization,
  getOrganizationDetail,
  editOrganization,
  logoutOrganization,
  getAllOrganizations,
  deleteAllOrganizations

}