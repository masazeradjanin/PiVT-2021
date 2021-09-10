import IModel from '../../common/IModel.interface';


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
    parentCategory: FurnitureModel | null = null;
    subCategories: FurnitureModel[] = [];

}
export default FurnitureModel;