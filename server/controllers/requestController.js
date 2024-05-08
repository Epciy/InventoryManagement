const Request = require('../models/Request');
const Material =require('../models/Material');



exports.createRequest = async (req, res) => {
  try {
    const { materialId, userId, userRole } = req.body;
    const existingRequest = await Request.findOne({
      user_id: userId,
      material_id: materialId,
      request_type: 'assignment'
    });

    if (existingRequest) {
      await existingRequest.updateOne({ request_type: 'return' ,status: 'pending'});
      res.status(200).json({ message: 'Request updated to return successfully' });
    } else {
      const request = new Request({
        user_id: userId,
        material_id: materialId,
        request_type: 'assignment',
        status: 'pending',
        user_role: userRole
      });

      await request.save();
      res.status(201).json({ message: 'Request created successfully' });
    }
  } catch (error) {
    console.error('Error creating/updating request:', error);
    res.status(500).json({ error: 'An error occurred while creating/updating request' });
  }
};


/*
exports.createRequest = async (req, res) => {
  try {
    const { materialId, userId,userRole } = req.body;

    const request = new Request({
      user_id: userId,
      material_id: materialId,
      request_type: 'assignment', 
      status: 'pending',
      user_role:userRole
    });

    await request.save();

    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'An error occurred while creating request' });
  }
};
*/
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'An error occurred while fetching requests' });
  }
};


exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    await Request.findByIdAndUpdate(requestId, { status: 'accepted' });
    const request = await Request.findById(requestId);
    const materialId = request.material_id;
    const userRole=request.user_role
    const type=request.request_type
    if (type==="return"){
      await Material.findByIdAndUpdate(materialId, { status: 'stored' });
    }else{
      await Material.findByIdAndUpdate(materialId, { status: 'in use' });
    }
    
    const materialUpdate = { entrusted_to: { type: userRole } };
    if (userRole === 'individual') {
      materialUpdate.entrusted_to="individual";

    } else if (userRole === "organization") {
      materialUpdate.entrusted_to="organization";
    }
    await Material.findByIdAndUpdate(materialId, materialUpdate);

    res.status(200).json({ message: 'Request accepted successfully' });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'An error occurred while accepting request' });
  }
};


exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    
    await Request.findByIdAndUpdate(requestId, { status: 'rejected' });

    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ error: 'An error occurred while rejecting request' });
  }
};