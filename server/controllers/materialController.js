const Material = require('../models/Material');


const addMaterial = async (req, res) => {
  try {
    const { name, type, status,entrusted_to} = req.body;
    const newMaterial = new Material({ name, type, status ,entrusted_to});
    await newMaterial.save();
    res.status(201).json({ message: 'Material added successfully' });
  } catch (error) {
    console.error('Error adding material:', error);
    res.status(500).json({ error: 'An error occurred while adding material' });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const material = await Material.findByIdAndDelete(materialId);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ error: 'An error occurred while deleting material' });
  }
};

const editMaterial = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const {name, type, status ,entrusted_to} = req.body;
    const material = await Material.findByIdAndUpdate(materialId, {name, type, status ,entrusted_to}, { new: true });
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json({ message: 'Material details modified successfully', material });
  } catch (error) {
    console.error('Error editing material:', error);
    res.status(500).json({ error: 'An error occurred while editing material' });
  }
};

const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching all materials:', error);
    res.status(500).json({ error: 'An error occurred while fetching all materials' });
  }
};


const deleteAllMaterials = async (req, res) => {
  try {
    await Material.deleteMany({});
    res.status(200).json({ message: 'All materials deleted successfully' });
  } catch (error) {
    console.error('Error deleting all materials:', error);
    res.status(500).json({ error: 'An error occurred while deleting all materials' });
  }
};


const getMaterialDetail = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    console.error('Error getting material detail:', error);
    res.status(500).json({ error: 'An error occurred while getting material detail' });
  }
};

module.exports= {
  getMaterialDetail,
  editMaterial,
  deleteMaterial,
  deleteAllMaterials,
  addMaterial,
  getAllMaterials
};
