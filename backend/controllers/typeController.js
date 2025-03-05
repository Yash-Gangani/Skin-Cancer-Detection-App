// import mongoose from "mongoose";
// import { TypeSchema } from "../models/typeModel";
// import fs from 'fs';

// const Type = mongoose.model('Type', TypeSchema);

// export const addType = async (req, res) => {
//     let newType = new Type(req.body)
  
//     try {
//       const type = await newType.save()
//       res.json(type)
//     } catch(err) {
//       res.send(err)
//     }
//   }
  
// export const getTypes = async (req, res) => {
//   try{
//     const types = await Type.find({})
//     res.json(types)
//   } catch(err) {
//     res.send(err)
//   }
// }

// export const getTypeById = async (req, res) => {
//   try{
//     const type = await Type.findById(req.params.TypeId)
//     res.json(type)
//   } catch(err) {
//     res.send(err)
//   }
// }

// export const getTypeByName = async (req, res) => {
//   try{
//     const type = await Type.findOne(
//       {name:req.params.TypeName}
//     )
//     res.json(type)
//   } catch(err) {
//     res.send(err)
//   }
// }

// export const updateTypeById = async (req, res) => {
//   try{
//     const type = await Type.findOneAndUpdate(
//       { _id: req.params.TypeId },
//       req.body,
//       { new: true }
//     )
//     res.json(type)
//   } catch(err) {
//     res.send(err)
//   }
// }

// export const deleteTypeById = async (req, res) => {
//   try{
//     await Type.deleteOne({ _id: req.params.TypeId })
//     res.json({ message: 'Type deleted successfully' })
//   }catch(err) {
//     res.send(err)
//   }
// }

// export const loadDB = async (req, res) => {
//   try{
//       const data = JSON.parse(fs.readFileSync('./cancers.json', 'utf8'));
//       console.log(data)
//       await Type.insertMany(data)
//       res.send('Data loaded successfully')
//       } catch (error) {
//         console.error('Error during database operation:', error);
//       }
//   }






import mongoose from "mongoose";
import Type from "../models/typeModel.js";  // Import the model
import fs from "fs";
import path from "path";

// Add a new type to the database
export const addType = async (req, res) => {
    try {
        const newType = new Type(req.body);
        const type = await newType.save();
        res.status(201).json(type);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all cancer types
export const getTypes = async (req, res) => {
    try {
        const types = await Type.find({});
        res.json(types);
    } catch (err) {
        res.status(500).json({ error: "Error fetching types" });
    }
};

// Get cancer type by ID
export const getTypeById = async (req, res) => {
    try {
        const type = await Type.findById(req.params.TypeId);
        if (!type) return res.status(404).json({ error: "Type not found" });
        res.json(type);
    } catch (err) {
        res.status(500).json({ error: "Invalid Type ID" });
    }
};

// Get cancer type by Name
export const getTypeByName = async (req, res) => {
    try {
        const type = await Type.findOne({ name: req.params.TypeName });
        if (!type) return res.status(404).json({ error: "Type not found" });
        res.json(type);
    } catch (err) {
        res.status(500).json({ error: "Error fetching type by name" });
    }
};

// Update cancer type by ID
export const updateTypeById = async (req, res) => {
    try {
        const updatedType = await Type.findByIdAndUpdate(
            req.params.TypeId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedType) return res.status(404).json({ error: "Type not found" });
        res.json(updatedType);
    } catch (err) {
        res.status(400).json({ error: "Error updating type" });
    }
};

// Delete a cancer type by ID
export const deleteTypeById = async (req, res) => {
    try {
        const deletedType = await Type.findByIdAndDelete(req.params.TypeId);
        if (!deletedType) return res.status(404).json({ error: "Type not found" });
        res.json({ message: "Type deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting type" });
    }
};

// Load initial cancer data from JSON
export const loadDB = async (req, res) => {
    try {
        const dataPath = path.join(process.cwd(), "data", "cancers.json");
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        // Insert data into MongoDB
        await Type.insertMany(data);
        res.json({ message: "Data loaded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error loading database" });
    }
};