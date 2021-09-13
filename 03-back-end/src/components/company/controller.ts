
import BaseController from "../../common/BaseController";
import {Request, Response, NextFunction} from "express";
import CompanyModel from "./model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddCompany, IAddCompanyValidator } from "./dto/IAddCompany";
import { IEditCompany, IEditCompanyValidator } from "./dto/IEditCompany";

class CompanyController extends BaseController{

    async getAll(req: Request, res: Response, next: NextFunction){
        const companies = await this.services.companyService.getAll({loadLocation: true,});
        res.send(companies);
    }

    async getById(req: Request, res: Response, next: NextFunction){

        const id : string = req.params.id;
        const companyId: number = +id;
        
        if(companyId <= 0){
            res.sendStatus(400);
            return;
        }
        const data : CompanyModel | null | IErrorResponse = await this.services.companyService.getById(companyId,
            {
                loadLocation: true,
            });
        if (data === null){
            res.sendStatus(404);
            return;
        }
        if (data instanceof CompanyModel){
            res.send(data);
            return;
        }
        res.status(500).send(data);


}
async add(req: Request, res: Response, next: NextFunction){
    const data= req.body;
    if(!IAddCompanyValidator(data)){
        res.status(400).send(IAddCompanyValidator.errors);
        return;
    }
    const result = await this.services.companyService.add(data as IAddCompany);
    res.send(result);
    }
    async edit(req: Request, res: Response, next: NextFunction){
    
        const id : string = req.params.id;
        const categoryId: number = +id;
        
        if(categoryId <= 0){
            res.status(400).send("Invalid ID number");
            return;
        }
    
        const data= req.body;
        if(!IEditCompanyValidator(data)){
            res.status(400).send(IEditCompanyValidator.errors);
            return;
            }
            const result = await this.services.companyService.edit(categoryId, data as IEditCompany, {loadLocation: true,});
            if (result === null){
                res.sendStatus(404);
                return;
            }
              res.send(result)
        }
    
async deleteById(req: Request, res: Response, next: NextFunction){
    const id : string = req.params.id;
const companyId: number = +id;

if(companyId <= 0){
    res.status(400).send("Invalid ID number");
    return;

}
res.send(await this.services.categoryService.delete(companyId))
}
}

export default CompanyController;