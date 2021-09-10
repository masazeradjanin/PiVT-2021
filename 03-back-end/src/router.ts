import express = require("express");
import IApplicationRosources from "./common/IApplicationResources.interface";
import IRouter from './common/IRouter.interface';

export default class Router{
 static setupRoutes(application: express.Application, resources: IApplicationRosources, routers: IRouter[]){
    for (const router of routers){
        router.setupRoutes(application, resources);
    }

 }
}