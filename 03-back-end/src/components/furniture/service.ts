import BaseService from '../../../dist/services/BaseService';
import IModelAdapterOptionsInterface from '../../common/IModelAdapterOptions.interface';
import FurnitureModel from './model';

export class FurnitureModelAdapterOptions implements IModelAdapterOptionsInterface {
    loadCategory: boolean = false;
    loadPrices: boolean = true;
    loadPhotos: boolean = false;
}

class FurnitureService extends BaseService<FurnitureModel>{
    protected async adaptModel( data: any,
        options: Partial<FurnitureModelAdapterOptions>
    ): Promise<FurnitureModel> {
        const item: FurnitureModel = new FurnitureModel();

        item.furnitureId= +(data?.furniture_id);
        item.createdAt = new Date(data?.created_at);
        item.title = data?.title;
        item.description = data?.description;
        item.descriptionCons = data?.descr_cons;
        item.dimensions = data?.dimensions;
        item.color = data?.color;
        item.material = data?.material;
        item.isAvailabe = +(data?.is_active) === 1;
        item.categoryId = +(data?.category_id);
        item.locationId = +(data?.locationId);

    
return item;
}
}
export default FurnitureService;