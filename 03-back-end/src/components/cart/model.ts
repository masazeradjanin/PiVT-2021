import IModel from '../../common/IModel.interface';
import UserModel from '../user/model';
import FurnitureModel from '../furniture/model';

type OrderStatus = 'pending' | 'rejected' | 'accepted' | 'completed';

class OrderModel implements IModel {
    orderId: number;
    createdAt: Date;
    status: OrderStatus;
}

class CartFurnitureModel implements IModel {
    cartFurnitureId: number;
    quantity: number;
    furnitureId: number;
    furniture: FurnitureModel;
}

export default class CartModel implements IModel {
    cartId: number;
    createdAt: Date;
    userId: number;
    user: UserModel;
    furniture: CartFurnitureModel[] = [];
    order?: OrderModel|null = null;
    furnitures: any;
}

export { CartFurnitureModel };
export { OrderModel };
export type { OrderStatus };