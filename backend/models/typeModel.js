import mongoose from "mongoose";

const Schema = mongoose.Schema


export const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    treatment: {
        type: [String]
    },
    next_steps: {
        type: [String]
    }
})