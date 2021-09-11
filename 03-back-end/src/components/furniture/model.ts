import IModel from '../../common/IModel.interface';
import CategoryModel from '../category/model';

class Price implements IModel {
    priceId: number;
    price: number;
    createdAt: Date;
}

class Photo implements IModel {
    photoId: number;
    imagePath: string;
}

class FurnitureModel implements IModel{
    furnitureId: number;
    createdAt: Date;
    title: string;
    description: string;
    descriptionCons : string;
    dimensions: string;
    color: string;
    material: string;
    isAvailabe: boolean;
    categoryId: number;
    locationId: number;
    category?: CategoryModel[] = [];
    currentPrice: number;
    prices: Price[] = [];
    photos: Photo[]=[];

}
export { Price as ArticlePrice };
export { Photo as ArticlePhoto };
export default FurnitureModel;