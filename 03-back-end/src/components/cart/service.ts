import BaseService from '../../common/BaseService';
import IModelAdapterOptionsInterface from '../../common/IModelAdapterOptions.interface';
import CartModel, { CartFurnitureModel, OrderModel } from './model';
import UserModel from '../user/model';
import FurnitureModel from '../furniture/model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IOrderStatus } from './dto/IOrderStatus';
import { FurnitureModelAdapterOptions } from '../furniture/service';

export class CartModelAdapterOptions implements IModelAdapterOptionsInterface {
    loadUser: boolean = false;
    loadFurnitures: boolean = false;
    loadOrder: boolean = false;

    furnitureModelAdapterOptions: FurnitureModelAdapterOptions = {
        loadCategory: true,
        loadPrices: true,
        loadPhotos: true,
    };
}

export default class CartService extends BaseService<CartModel> {
    protected async adaptModel(
        data: any,
        options: Partial<CartModelAdapterOptions>,
    ): Promise<CartModel> {
        const item = new CartModel();

        item.cartId    = +(data?.cart_id);
        item.createdAt = new Date(data?.created_at);
        item.userId    = +(data?.user_id);

        if (options.loadUser) {
            item.user = await this.services.userService.getById(item.userId) as UserModel;
        }

        if (options.loadOrder) {
            item.order = await this.getOrderByCartId(item.cartId);
        }

        if (options.loadFurnitures) {
            item.furnitures = await this.getAllCartFurnituresByCartId(item.cartId, options.furnitureModelAdapterOptions);
        }

        return item;
    }
    
    private async getOrderByCartId(cartId: number): Promise<OrderModel | null> {
        const [ rows ] = await this.db.execute(
            `SELECT * FROM \`order\` WHERE cart_id = ?;`,
            [ cartId, ]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }
        
        const order = rows[0] as any;

        return {
            orderId: +(order?.order_id),
            createdAt: new Date(order?.created_at),
            status: order?.status,
        }
    }

    private async getAllCartFurnituresByCartId(cartId: number, furnitureModelAdapterOptions: FurnitureModelAdapterOptions): Promise<CartFurnitureModel[]> {
        const [ rows ] = await this.db.execute(
            `SELECT * FROM cart_furniture WHERE cart_id = ?;`,
            [ cartId, ]
        );
        
        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        const items: CartFurnitureModel[] = [];

        for (const row of rows) {
            const data = row as any;

            const furnitureId = +(data?.furniture_id);

            items.push({
                cartFurnitureId: +(data?.cart_furniture_id),
                furnitureId: furnitureId,
                quantity: +(data?.quantity),
                furniture: await this.services.furnitureService.getById(furnitureId, furnitureModelAdapterOptions) as FurnitureModel,
            });
        }

        return items;
    }

    public async getById(cartId: number, options: Partial<CartModelAdapterOptions> = {}): Promise<CartModel|null> {
        return await super.getByIdFromTable<CartModelAdapterOptions>("cart", cartId, options) as CartModel|null;
    }

    private async add(userId: number): Promise<CartModel|IErrorResponse> {
        return new Promise<CartModel|IErrorResponse>(async resolve => {
            this.db.execute(
                `INSERT cart SET user_id = ?;`,
                [ userId, ]
            )
            .then(async res => {
                const insertData = res[0] as any;
                const newCartId = +(insertData?.insertId);
                resolve(await this.getById(newCartId, {
                    loadUser: true,
                }));
            })
            .catch(err => {
                resolve({
                    errorCode: err?.errno,
                    errorMessage: err?.sqlMessage,
                });
            });
        });
    }

    public async getAllCartsByUserId(userId: number, options: Partial<CartModelAdapterOptions> = {}): Promise<CartModel[]> {
        return await super.getAllByFieldNameFromTable<CartModelAdapterOptions>("cart", "user_id", userId, options) as CartModel[];
    }

    public async getLatestCartByUserId(userId: number, options: Partial<CartModelAdapterOptions> = {}): Promise<CartModel> {
        const [ rows ] = await this.db.execute(
            `SELECT
                cart.*
            FROM
                cart
            LEFT JOIN \`order\` ON \`order\`.cart_id = cart.cart_id
            WHERE
                cart.user_id = ?
                AND \`order\`.order_id IS NULL
            ORDER BY
                cart.created_at DESC
            LIMIT 1;`,
            [ userId, ]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return await this.add(userId) as CartModel;
        }

        const cartId: number = +((rows as any[])[0]?.cart_id);

        return await this.getById(cartId, {
            loadUser: true,
            loadFurnitures: true,
        });
    }

    public async addFurnitureToLatestCartByUserId(userId: number, furnitureId: number, quantity: number): Promise<CartModel> {
        const cart = await this.getLatestCartByUserId(userId, {
            loadFurnitures: true,
        });

        const filteredFurnitures = cart.furnitures.filter(a => a.furnitureId === furnitureId);

        if (filteredFurnitures.length === 1) {
            await this.db.execute(
                `UPDATE
                    cart_furniture
                SET
                    quantity = quantity + ?
                WHERE
                    cart_id = ?
                    AND furniture_id = ?;`,
                [ quantity, cart.cartId, furnitureId, ]
            );
        } else {
            await this.db.execute(
                `INSERT
                    cart_furniture
                SET
                    quantity = ?,
                    cart_id = ?,
                    furniture_id = ?;`,
                [ quantity, cart.cartId, furnitureId, ]
            );
        }

        return await this.getById(cart.cartId, {
            loadFurnitures: true,
        });
    }

    public async setFurnitureToLatestCartByUserId(userId: number, furnitureId: number, quantity: number): Promise<CartModel> {
        const cart = await this.getLatestCartByUserId(userId, {
            loadFurnitures: true,
        });

        const filteredFurnitures = cart.furnitures.filter(a => a.furnitureId === furnitureId);

        if (filteredFurnitures.length === 1) {
            if (quantity > 0) {
                await this.db.execute(
                    `UPDATE
                        cart_furniture
                    SET
                        quantity = ?
                    WHERE
                        cart_id = ?
                        AND furniture_id = ?;`,
                    [ quantity, cart.cartId, furnitureId, ]
                );
            } else {
                await this.db.execute(
                    `DELETE FROM
                        cart_furniture
                    WHERE
                        cart_id = ?
                        AND furniture_id = ?;`,
                    [ cart.cartId, furnitureId, ]
                );
            }
        } else {
            if (quantity > 0) {
                await this.db.execute(
                    `INSERT
                        cart_furniture
                    SET
                        quantity = ?,
                        cart_id = ?,
                        furnituree_id = ?;`,
                    [ quantity, cart.cartId,furnitureId, ]
                );
            }
        }

        return await this.getById(cart.cartId, {
            loadFurnitures: true,
        });
    }

    public async makeOrder(userId: number): Promise<CartModel|IErrorResponse> {
        return new Promise<CartModel|IErrorResponse>(async resolve => {
            const cart = await this.getLatestCartByUserId(userId, {
                loadFurnitures: true,
            });

            if (cart.furnitures.length === 0) {
                return resolve({
                    errorCode: -3011,
                    errorMessage: "You cannot make an order with an empty cart.",
                });
            }

            this.db.execute(
                `INSERT INTO \`order\` SET cart_id = ?;`,
                [ cart.cartId, ],
            )
            .then(async () => {
                resolve(await this.getById(cart.cartId, {
                    loadFurnitures: true,
                    loadOrder: true,
                    loadUser: true,
                }));
            })
            .catch(err => {
                resolve({
                    errorCode: err?.errno,
                    errorMessage: err?.sqlMessage,
                });
            })
        });
    }

    public async getAllOrdersByUserId(userId: number): Promise<CartModel[]> {
        const [ rows ] = await this.db.execute(
            `SELECT
                cart.*
            FROM
                cart
            INNER JOIN \`order\` ON \`order\`.cart_id = cart.cart_id
            WHERE
                cart.user_id = ?
            ORDER BY
                \`order\`.created_at DESC;`,
            [ userId ]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        const items: CartModel[] = [];

        for (const row of rows) {
            const data: any = row;

            items.push(await this.adaptModel(data, {
                loadFurnitures: true,
                loadOrder: true,
                loadUser: true,
            }));
        }

        return items;
    }

    public async getAllOrders(): Promise<CartModel[]> {
        const [ rows ] = await this.db.execute(
            `SELECT
                cart.*
            FROM
                cart
            INNER JOIN \`order\` ON \`order\`.cart_id = cart.cart_id
            ORDER BY
                \`order\`.created_at DESC;`
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return [];
        }

        const items: CartModel[] = [];

        for (const row of rows) {
            const data: any = row;

            items.push(await this.adaptModel(data, {
                loadFurnitures: true,
                loadOrder: true,
                loadUser: true,
                furnitureModelAdapterOptions: {
                    loadCategory: true,
                    loadPhotos: true,
                    loadPrices: true,
                }
            }));
        }

        return items;
    }

    public async setOrderStatus(cartId: number, data: IOrderStatus): Promise<CartModel|IErrorResponse> {
        return new Promise<CartModel|IErrorResponse>(async resolve => {
            const cart = await this.getById(cartId, {
                loadOrder: true,
            });
    
            if (cart.order === null) {
                return resolve({
                    errorCode: -3022,
                    errorMessage: "This cart has no order.",
                });
            }

            this.db.execute(
                `UPDATE \`order\` SET \`status\` = ? WHERE order_id = ?;`,
                [ data.status, cart.order.orderId ]
            )
            .then(async () => {
                resolve(await this.getById(cartId, {
                    loadOrder: true,
                    loadFurnitures: true,
                    loadUser: true,
                }));
            })
            .catch(err => {
                resolve({
                    errorCode: err?.errno,
                    errorMessage: err?.sqlMessage,
                });
            });
        });
    }
}