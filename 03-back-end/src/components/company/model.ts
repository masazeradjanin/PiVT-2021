import IModel from "../../common/IModel.interface";

class LocationModel implements IModel {
    locationId: number;
    address: string;
    latitude: number;
    logitude: number;
   
}

export default class CompanyModel implements IModel {
    companyId: number;
    name: string;
    companyLocation: LocationModel[] = [];
    location: LocationModel;
    locationId: number;
    
}


export {LocationModel};