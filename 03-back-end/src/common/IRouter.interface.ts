import express = require("express");
import IApplicationRosources from "./IApplicationResources.interface";
export default interface IRouter{

  setupRoutes(application: express.Application, resources: IApplicationRosources);
}