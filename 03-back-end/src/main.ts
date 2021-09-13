
import * as express from "express";
import * as cors from "cors";
import Config from './config/dev';
import CategoryRouter from './components/category/router';
import * as mysql2 from "mysql2/promise"
import IApplicationRosources from './common/IApplicationResources.interface';
import Router from './router';
import CategoryService from './components/category/service';
import AdministratorRouter from "./components/administrator/router";
import AdministratorService from './components/administrator/service';
import UserRouter from './components/user/router';
import UserService from './components/user/service';
import CompanyService from './components/company/service';

async function main() {
    const application: express.Application = express();

    application.use(cors());
    application.use(express.json());
    
   
    const resources: IApplicationRosources ={
        databaseConnection :await mysql2.createConnection({
            host: Config.database.host,
            port: Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.database,
            charset: Config.database.charset,
            timezone: Config.database.timezone,
            supportBigNumbers: true,
        }) 
}
    

    resources.databaseConnection.connect();
    resources.services={
        categoryService: new CategoryService(resources),
        administratorService: new AdministratorService(resources),
        userService: new UserService(resources),
        //companyService: new CompanyService(resources),
    }

    application.use(Config.server.static.route,
         express.static(Config.server.static.path, {
        index: Config.server.static.index,
        cacheControl: Config.server.static.cacheControl,
        maxAge: Config.server.static.maxAge,
        etag: Config.server.static.etag,
        dotfiles: Config.server.static.dotfiles,
    }),
    );
    
    Router.setupRoutes(application, resources, [
        new CategoryRouter(),
        new AdministratorRouter(),
        new UserRouter(),
        //new ArticleRouter(),
    ]);
  

    application.use(( req, res) =>{
     res.sendStatus (404) ; 
    });

    application.use((err, req, res, next)=> {
    res.status(500);
    }
    );
    
    application.listen(Config.server.port);
    
    
    
    
    
    
}
main();