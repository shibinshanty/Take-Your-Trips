const Destination = require('../models/destination');


// Add Destination (Admin)
exports.addDestination = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);
    console.log("Uploaded File Info:", req.file); 

    const { name, description, price, location } = req.body;

    const image = req.file ? req.file.path : null;

    const newDestination = new Destination({
      name,
      description,
      price,
      location,
      image,
    });

    await newDestination.save();

    res.status(201).json({
      message: "Destination added successfully!",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Error in addDestination:", error); 
    res.status(500).json({
      message: "Error adding destination",
      error: error.message,
    });
  }
};




// Get all Destinations (Admin)
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destinations", error: err.message });
  }
};

// Update Destination (Admin)
exports.updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({ message: "Destination updated!", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating destination", error: err.message });
  }
};

// Delete Destination (Admin)
exports.deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({ message: "Destination deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting destination", error: err.message });
  }
};

// Public Route: View Destinations
exports.publicDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destinations", error: err.message });
  }
};
//verified token get single destination details
exports.getSingleDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destination", error: err.message });
  }
};

