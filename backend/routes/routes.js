import {
    addType,
    getTypes,
    getTypeById,
    getTypeByName,
    updateTypeById,
    deleteTypeById,
    loadDB
  
} from '../controllers/typeController';

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
    
}

export default routes