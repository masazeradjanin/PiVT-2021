import { Application } from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import FurnitureController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';

export default class FurnitureRouter implements IRouter {
    public setupRoutes(application: Application, resources: IApplicationResources) {
        
        const furnitureController = new FurnitureController(resources);

application.get( '/furniture/:id', AuthMiddleware.getVerifier("user", "administrator"), furnitureController.getById.bind(furnitureController));
application.post( '/furniture',   AuthMiddleware.getVerifier("administrator"), furnitureController.add.bind(furnitureController));
application.put('/furniture/:id', AuthMiddleware.getVerifier("administrator"),  furnitureController.edit.bind(furnitureController) );
application.delete('/furniture/:id', AuthMiddleware.getVerifier("administrator"), furnitureController.delete.bind(furnitureController));
application.delete('/furniture/:aid/photo/:pid',AuthMiddleware.getVerifier("administrator"), furnitureController.deleteFurniturePhoto.bind(furnitureController) );
application.post( '/furniture/:id/photo', AuthMiddleware.getVerifier("administrator"), furnitureController.addFurniturePhotos.bind(furnitureController));
application.get("/category/:id/furniture", AuthMiddleware.getVerifier("user", "administrator"), furnitureController.getAllByCategoryId.bind(furnitureController)
        );
    }
}