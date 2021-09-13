
import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddCompany } from "./dto/IAddCompany";
import { IEditCompany } from "./dto/IEditCompany";

import CompanyModel, { LocationModel } from "./model";

class CompanyModelAdapterOptions implements IModelAdapterOptions{
   
    loadLocation: boolean = false;
    
    
}

export default class CompanyService extends BaseService<CompanyModel> {
    protected async adaptModel(
        data: any,
        options: Partial<CompanyModelAdapterOptions>,
    ): Promise<CompanyModel> {
        const item = new CompanyModel();

        item.companyId    = +(data?.company_id);
        item.name = data?.name;
        
        if (options.loadLocation) {
            item.location = await this.getLocationByCompanyId(item.locationId);
        }

        return item;
    }
    private async getLocationByCompanyId(companyId: number): Promise<LocationModel | null> {
        const [ rows ] = await this.db.execute(
            `SELECT * FROM \`location\` WHERE company_id = ?;`,
            [ companyId, ]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }
        
        const location = rows[0] as any;

        return {
            locationId: +(location?.location_id),
            address: location?.address,
            latitude: location?.latitude,
            logitude: location?.longitude,
        }
    }
    
    public async getAll(options: Partial<CompanyModelAdapterOptions> = {}): Promise<CompanyModel[] | null | IErrorResponse> {
        return await this.getAllFromTable<CompanyModelAdapterOptions>("company", options);
    }

    public async getById(companyId: number, options: Partial<CompanyModelAdapterOptions> = {}): Promise<CompanyModel | null | IErrorResponse> {
        return await this.getByIdFromTable<CompanyModelAdapterOptions>("company", companyId, options);
    }

    public async add(data: IAddCompany): Promise<CompanyModel|IErrorResponse>{
        return new Promise<CompanyModel|IErrorResponse>(async resolve=>{
            const sql="INSERT company SET name = ?;";
    
            this.db.execute(sql,[data.name])
            .then(async result=>{
                const insertInfo:any  = result[0];
                const newCompanyId: number = +(insertInfo?.insertId);
                resolve(await this.getById(newCompanyId));
    
            })
            .catch(error=>{ resolve({
                errorCode: error?.errno
                ,
                errorMessage:error?.sqlMessage
                
            });
    
            });
        });
    
    }
  

    public async delete(companyId: number): Promise<IErrorResponse> {
        return new Promise<IErrorResponse>(resolve => {
            const sql = "DELETE FROM company WHERE company_id = ?;";
            this.db.execute(sql, [companyId])
                .then(async result => {
                    const deleteInfo: any = result[0];
                    const deletedRowCount: number = +(deleteInfo?.affectedRows);

                    if (deletedRowCount === 1) {
                        resolve({
                            errorCode: 0,
                            errorMessage: "One record is deleted!"
                        })
                    } else {
                        resolve({
                            errorCode: -1,
                            errorMessage: "Record could not be deleted!"
                        })
                    }
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage,
                    })
                })
        })
    }
    public async edit(companyId: number,
        data:IEditCompany, 
       options: Partial<CompanyModelAdapterOptions> ={},): Promise<CompanyModel|IErrorResponse|null>{
       const result = await this.getById(companyId);
   
       if(result === null){ return null;}
       if(!(result instanceof CompanyModel))
       { return result;}
   
           return new Promise<CompanyModel|IErrorResponse>(async resolve=>{
               const sql="UPDATE company SET name = ? WHERE company_id=?;";
       
               this.db.execute(sql,[data.name, companyId])
               .then(async result=>{
                   
                   resolve(await this.getById(companyId, options));
       
               })
               .catch(error=>{ resolve({
                   errorCode: error?.errno
                   ,
                   errorMessage:error?.sqlMessage
                   
               });
       
               });
           });

}
}

