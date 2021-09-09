import * as mysql2 from 'mysql2/promise';

export default interface IApplicationRosources{
    databaseConnection: mysql2.Connection;
    

}