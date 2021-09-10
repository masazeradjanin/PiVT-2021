import IApplicationResources from './IApplicationResources.interface';
import IServices from './IServices.interface';

type NewType = IApplicationResources;

export default abstract class BaseController {
    private resources: IApplicationResources;

    constructor(resources: NewType) {
        this.resources = resources;
    }

    protected get services(): IServices {
        return this.resources.services;
    }
}
