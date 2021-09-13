import * as express from 'express';
import CompanyController from './controller';
import IApplicationRosources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';


export default class CompanyRouter implements IRouter{
public  setupRoutes(application: express.Application, resources: IApplicationRosources){
  
const companyController: CompanyController = new CompanyController(resources);

application.get("/company",            companyController.getAll.bind(companyController));
application.get("/company/:id",        companyController.getById.bind(companyController));  
application.post("/company",           companyController.add.bind(companyController));
application.put("/company/:id",        companyController.edit.bind(companyController));            
application.delete("/company/:id",     companyController.deleteById.bind(companyController)); 
}
}