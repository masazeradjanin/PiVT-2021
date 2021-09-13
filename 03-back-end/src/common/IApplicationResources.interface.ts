import * as mysql2 from 'mysql2/promise';
import IServices from './IServices.interface';

export default interface IApplicationRosources{
    resources: { categoryService: import("c:/Users/Windows HD/Desktop/APLIKACIJA/03-back-end/src/components/category/service").default; administratorService: import("c:/Users/Windows HD/Desktop/APLIKACIJA/03-back-end/src/components/administrator/service").default; userService: import("c:/Users/Windows HD/Desktop/APLIKACIJA/03-back-end/src/components/user/service").default; };
    databaseConnection: mysql2.Connection;  
    services?: IServices;

}