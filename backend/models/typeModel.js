// import mongoose from "mongoose";

// const Schema = mongoose.Schema


// export const TypeSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String
//     },
//     treatment: {
//         type: [String]
//     },
//     next_steps: {
//         type: [String]
//     }
// })



import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    treatment: {
        type: [String],
        required: true
    },
    next_steps: {
        type: [String],
        required: true
    }
});

// Create Model
const Type = mongoose.model("Type", TypeSchema);
export default Type;