import {
    addType,
    getTypes,
    getTypeById,
    updateType,
    deleteType,
    loadDB
  
} from '../controllers/typeController';

const routes = (app) => {

    app.route('/load')
    .get(loadDB)

    app.route('/types')
    .get(getTypes)
    .post(addType)

    app.route('/type/:TypeId')
    .get(getTypeById)
    .put(updateType)
    .delete(deleteType)
    
}

export default routes