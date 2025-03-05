// import {
//     addType,
//     getTypes,
//     getTypeById,
//     getTypeByName,
//     updateTypeById,
//     deleteTypeById,
//     loadDB
  
// } from '../controllers/typeController.js';

// const routes = (app) => {

//     app.route('/load')
//     .get(loadDB)

//     app.route('/types')
//     .get(getTypes)
//     .post(addType)

//     app.route('/typeId/:TypeId')
//     .get(getTypeById)
//     .put(updateTypeById)
//     .delete(deleteTypeById)

//     app.route('/typeName/:TypeName')
//     .get(getTypeByName)
    
// }

// export default routes




import {
    addType,
    getTypes,
    getTypeById,
    getTypeByName,
    updateTypeById,
    deleteTypeById,
    loadDB
} from '../controllers/typeController.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = (app) => {
    app.route('/load')
    .get(loadDB)

    app.route('/types')
    .get(getTypes)
    .post(addType)

    app.route('/typeId/:TypeId')
    .get(getTypeById)
    .put(updateTypeById)
    .delete(deleteTypeById)

    app.route('/typeName/:TypeName')
    .get(getTypeByName)

    // New route for cancer types
    app.route('/api/cancer-types')
.get((req, res) => {
    try {
        // Log the expected path for debugging
        const dataPath = path.join(__dirname, '../cancers.json');
        console.log('Looking for cancer data at:', dataPath);
        
        // Check if the file exists
        if (!fs.existsSync(dataPath)) {
            console.error('File not found at:', dataPath);
            return res.status(404).json({ message: 'Cancer data file not found' });
        }
        
        // Read the file
        const cancerData = fs.readFileSync(dataPath, 'utf8');
        
        // Try parsing the JSON
        const parsedData = JSON.parse(cancerData);
        
        // Send the data
        res.status(200).json(parsedData);
    } catch (error) {
        console.error('Error reading cancer data:', error);
        res.status(500).json({ 
            message: 'Failed to load cancer information',
            error: error.message 
        });
    }
});
}

export default routes;