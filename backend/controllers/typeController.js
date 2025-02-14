import mongoose from "mongoose";
import { TypeSchema } from "../models/typeModel";
import fs from 'fs';

const Type = mongoose.model('Type', TypeSchema);

export const addType = async (req, res) => {
    let newType = new Type(req.body)
  
    try {
      const type = await newType.save()
      res.json(type)
    } catch(err) {
      res.send(err)
    }
  }
  
  export const getTypes = async (req, res) => {
    try{
      const types = await Type.find({})
      res.json(types)
    } catch(err) {
      res.send(err)
    }
  }
  
  export const getTypeById = async (req, res) => {
    try{
      const type = await Type.findById(req.params.TypeId)
      res.json(type)
    } catch(err) {
      res.send(err)
    }
  }

  export const getTypeByName = async (req, res) => {
    try{
      const type = await Type.findOne(
        {name:req.params.TypeName}
      )
      res.json(type)
    } catch(err) {
      res.send(err)
    }
  }
  
  export const updateTypeById = async (req, res) => {
    try{
      const type = await Type.findOneAndUpdate(
        { _id: req.params.TypeId },
        req.body,
        { new: true }
      )
      res.json(type)
    } catch(err) {
      res.send(err)
    }
  }

  export const deleteTypeById = async (req, res) => {
    try{
      await Type.deleteOne({ _id: req.params.TypeId })
      res.json({ message: 'Type deleted successfully' })
    }catch(err) {
      res.send(err)
    }
  }
  
  export const loadDB = async (req, res) => {
    try{
        const data = JSON.parse(fs.readFileSync('./cancers.json', 'utf8'));
        console.log(data)
        await Type.insertMany(data)
        res.send('Data loaded successfully')
        } catch (error) {
          console.error('Error during database operation:', error);
        }
    }