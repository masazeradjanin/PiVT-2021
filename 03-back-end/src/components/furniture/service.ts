import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IErrorResponse.interface";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddFurniture, IUploadedPhoto } from "./dto/IAddFurniture";
import { IEditFurniture } from "./dto/IEditFurniture";
import FurnitureModel, { FurniturePhoto, FurniturePrice } from "./model";
import * as fs from "fs";
import Config from "../../config/dev";
import * as path from "path";

export class FurnitureModelAdapterOptions
  implements IModelAdapterOptionsInterface {
  loadCategory: boolean = false;
  loadPrices: boolean = true;
  loadPhotos: boolean = false;
}

class FurnitureService extends BaseService<FurnitureModel> {
  public async getAll(): Promise<FurnitureModel[]> {
    return (await this.services.furnitureService.getAllFromTable(
      "furniture",
      {}
    )) as FurnitureModel[];
  }

  protected async adaptModel(
    data: any,
    options: Partial<FurnitureModelAdapterOptions>
  ): Promise<FurnitureModel> {
    const item: FurnitureModel = new FurnitureModel();

    item.furnitureId = +data?.furniture_id;
    item.createdAt = new Date(data?.created_at);
    item.title = data?.title;
    item.description = data?.description;
    item.descriptionCons = data?.descr_cons;
    item.dimensions = data?.dimensions;
    item.color = data?.color;
    item.material = data?.material;
    item.isAvailabe = +data?.is_active === 1;
    item.categoryId = +data?.category_id;
    item.locationId = +data?.locationId;

    if (options.loadPrices) {
      item.prices = await this.getAllPricesByFurnitureId(item.furnitureId);
    }
    if (options.loadPhotos) {
      item.photos = await this.getAllPhotosByFurnitureId(item.furnitureId);
    }
    return item;
  }
  private async getAllPricesByFurnitureId(
    furnitureId: number
  ): Promise<FurniturePrice[]> {
    const sql = `
        SELECT
            furniture_price_id,
            created_at,
            price
        FROM
            furniture_price
        WHERE
            furniture_id = ?
        ORDER BY
            created_at ASC;`;
    const [rows] = await this.db.execute(sql, [furnitureId]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    return rows.map((row) => {
      return {
        priceId: +row?.furniture_price_id,
        createdAt: new Date(row?.created_at),
        price: +row?.price,
      };
    });
  }
  private async getAllPhotosByFurnitureId(
    furnitureId: number
  ): Promise<FurniturePhoto[]> {
    const sql = `SELECT photo_id, image_path FROM photo WHERE furniture_id = ?;`;
    const [rows] = await this.db.execute(sql, [furnitureId]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    return rows.map((row) => {
      return {
        photoId: +row?.photo_id,
        imagePath: row?.image_path,
      };
    });
  }

  private async getLatestPriceByFurnitureId(
    furnitureId: number
  ): Promise<number> {
    const sql = `SELECT price FROM furniture_price WHERE furniture_id = ? ORDER BY created_at DESC LIMIT 1;`;
    const [rows] = await this.db.execute(sql, [furnitureId]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return 0;
    }

    const data: any = rows[0];

    return +data?.price;
  }

  public async getById(
    furnitureId: number,
    options: Partial<FurnitureModelAdapterOptions> = {}
  ): Promise<FurnitureModel | IErrorResponse | null> {
    return this.getByIdFromTable("furniture", furnitureId, options);
  }

  public async add(
    data: IAddFurniture,
    uploadedPhotos: IUploadedPhoto[]
  ): Promise<FurnitureModel | IErrorResponse> {
    return new Promise<FurnitureModel | IErrorResponse>((resolve) => {
      this.db.beginTransaction().then(() => {
        this.db
          .execute(
            `
                INSERT furniture
                SET
                    title = ?,
                    description = ?,
                    descr_cons   = ?,
                    dimensions = ?,
                    color = ?,
                    material = ?,
                    is_available = ?,
                    category_id = ?,
                    location_id = ?;
                `,
            [
              data.title,
              data.description,
              data.descriptionCons,
              data.dimensions,
              data.color,
              data.material,
              data.isAvailable ? 1 : 0,
              data.categoryId,
              data.locationId,
            ]
          )
          .then(async (res: any) => {
            const newFurnitureId: number = +res[0]?.insertId;

            const promises = [];

            promises.push(
              this.db.execute(
                `INSERT furniture_price SET price = ?, furniture_id = ?;`,
                [data.price, newFurnitureId]
              )
            );

            for (const uploadedPhoto of uploadedPhotos) {
              promises.push(
                this.db.execute(
                  `INSERT photo SET furniture_id = ?, image_path = ?;`,
                  [newFurnitureId, uploadedPhoto.imagePath]
                )
              );
            }

            Promise.all(promises)
              .then(async () => {
                await this.db.commit();

                resolve(
                  await this.services.furnitureService.getById(newFurnitureId, {
                    loadCategory: true,
                    loadPhotos: true,
                    loadPrices: true,
                  })
                );
              })
              .catch(async (error) => {
                await this.db.rollback();

                resolve({
                  errorCode: error?.errno,
                  errorMessage: error?.sqlMessage,
                });
              });
          })
          .catch(async (error) => {
            await this.db.rollback();

            resolve({
              errorCode: error?.errno,
              errorMessage: error?.sqlMessage,
            });
          });
      });
    });
  }
  private editFurniture(furnitureId: number, data: IEditFurniture) {
    return this.db.execute(
      `UPDATE
            furniture
        SET
        title = ?,
        description = ?,
        descr_cons   = ?,
        dimensions = ?,
        color = ?,
        material = ?,
        is_available = ?
        WHERE
            furniture_id = ?;`,
      [
        data.title,
        data.color,
        data.material,
        data.isAvailable ? 1 : 0,
        furnitureId,
      ]
    );
  }
  private addFurniturePrice(furnitureId: number, newPrice: number) {
    return this.db.execute(
      `INSERT
            furniture_price
        SET
            furniture_id = ?,
            price = ?;`,
      [furnitureId, newPrice]
    );
  }

  public async edit(
    furnitureId: number,
    data: IEditFurniture
  ): Promise<FurnitureModel | null | IErrorResponse> {
    return new Promise<FurnitureModel | null | IErrorResponse>(
      async (resolve) => {
        const currentFurniture = await this.getById(furnitureId, {});

        if (currentFurniture === null) {
          return resolve(null);
        }

        const rollbackAndResolve = async (error) => {
          await this.db.rollback();
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        };

        this.db
          .beginTransaction()
          .then(() => {
            this.editFurniture(furnitureId, data).catch((error) => {
              rollbackAndResolve({
                errno: error?.errno,
                sqlMessage: "Part furniture: " + error?.sqlMessage,
              });
            });
          })
          .then(async () => {
            const currentPrice = (currentFurniture as FurnitureModel).currentPrice.toFixed(
              2
            );
            const newPrice = data.price.toFixed(2);

            if (currentPrice !== newPrice) {
              this.addFurniturePrice(furnitureId, data.price).catch((error) => {
                rollbackAndResolve({
                  errno: error?.errno,
                  sqlMessage: "Part price: " + error?.sqlMessage,
                });
              });
            }
          })

          .then(async () => {
            this.db.commit().catch((error) => {
              rollbackAndResolve({
                errno: error?.errno,
                sqlMessage: `Part save changes: ${error?.sqlMessage}`,
              });
            });
          })
          .then(async () => {
            resolve(
              await this.getById(furnitureId, {
                loadCategory: true,
                loadPhotos: true,
                loadPrices: true,
              })
            );
          })
          .catch(async (error) => {
            await this.db.rollback();

            resolve({
              errorCode: error?.errno,
              errorMessage: error?.sqlMessage,
            });
          });
      }
    );
  }
  public async delete(furnitureId: number): Promise<IErrorResponse | null> {
    return new Promise<IErrorResponse>(async (resolve) => {
      const currentFurniture = await this.getById(furnitureId, {
        loadPhotos: true,
        loadPrices: true,
      });

      if (currentFurniture === null) {
        return resolve(null);
      }

      this.db
        .beginTransaction()
        .then(async () => {
          if (await this.deleteFurniturePrices(furnitureId)) return;
          throw {
            errno: -1002,
            sqlMessage: "Could not delete furniture prices.",
          };
        })

        .then(async () => {
          if (await this.deleteFurnitureCartRecord(furnitureId)) return;
          throw {
            errno: -1004,
            sqlMessage: "Could not delete furniture cart records.",
          };
        })
        .then(async () => {
          const filesToDelete = await this.deleteFurniturePhotoRecords(
            furnitureId
          );
          if (filesToDelete.length !== 0) return filesToDelete;
          throw {
            errno: -1005,
            sqlMessage: "Could not delete furniture photo records.",
          };
        })
        .then(async (filesToDelete) => {
          if (await this.deleteFurnitureRecord(furnitureId))
            return filesToDelete;
          throw {
            errno: -1006,
            sqlMessage: "Could not delete the furniture records.",
          };
        })
        .then(async (filesToDelete) => {
          await this.db.commit();
          return filesToDelete;
        })
        .then((filesToDelete) => {
          this.deleteFurniturePhotosAndResizedVersion(filesToDelete);
        })
        .then(() => {
          resolve({
            errorCode: 0,
            errorMessage: "Furniture deleted!",
          });
        })
        .catch(async (error) => {
          await this.db.rollback();
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  private async deleteFurniturePrices(furnitureId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      this.db
        .execute(`DELETE FROM furniture_price WHERE furniture_id = ?;`, [
          furnitureId,
        ])
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
  private async deleteFurnitureCartRecord(
    furnitureId: number
  ): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      this.db
        .execute(`DELETE FROM cart_furniture WHERE furniture_id = ?;`, [
          furnitureId,
        ])
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  private async deleteFurniturePhotoRecords(
    furnitureId: number
  ): Promise<string[]> {
    return new Promise<string[]>(async (resolve) => {
      const [
        rows,
      ] = await this.db.execute(
        `SELECT image_path FROM photo WHERE furniture_id = ?;`,
        [furnitureId]
      );

      if (!Array.isArray(rows) || rows.length === 0) return resolve([]);

      const filesToDelete = rows.map((row) => row?.image_path);

      this.db
        .execute(`DELETE FROM photo WHERE furniture_id = ?;`, [furnitureId])
        .then(() => resolve(filesToDelete))
        .catch(() => resolve([]));

      resolve(filesToDelete);
    });
  }

  private async deleteFurnitureRecord(furnitureId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      this.db
        .execute(`DELETE FROM furniture WHERE furniture_id = ?;`, [furnitureId])
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  private deleteFurniturePhotosAndResizedVersion(filesToDelete: string[]) {
    try {
      for (const fileToDelete of filesToDelete) {
        fs.unlinkSync(fileToDelete);

        const pathParts = path.parse(fileToDelete);

        const directory = pathParts.dir;
        const filename = pathParts.name;
        const extension = pathParts.ext;

        for (const resizeSpecification of Config.fileUpload.photos.resizes) {
          const resizedImagePath =
            directory + "/" + filename + resizeSpecification.sufix + extension;

          fs.unlinkSync(resizedImagePath);
        }
      }
    } catch (e) {}
  }

  public async deleteFurniturePhoto(
    furnitureId: number,
    photoId: number
  ): Promise<IErrorResponse | null> {
    return new Promise<IErrorResponse | null>(async (resolve) => {
      const furniture = await this.getById(furnitureId, {
        loadPhotos: true,
      });

      if (furniture === null) {
        return resolve(null);
      }

      const filteredPhotos = (furniture as FurnitureModel).photos.filter(
        (p) => p.photoId === photoId
      );

      if (filteredPhotos.length === 0) {
        return resolve(null);
      }

      const photo = filteredPhotos[0];

      this.db
        .execute(`DELETE FROM photo WHERE photo_id = ?;`, [photo.photoId])
        .then(() => {
          this.deleteFurniturePhotosAndResizedVersion([photo.imagePath]);

          resolve({
            errorCode: 0,
            errorMessage: "Photo deleted.",
          });
        })
        .catch((error) =>
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          })
        );
    });
  }

  public async addFurniturePhotos(
    furnitureId: number,
    uploadedPhotos: IUploadedPhoto[]
  ): Promise<FurnitureModel | IErrorResponse | null> {
    return new Promise<FurnitureModel | IErrorResponse | null>(
      async (resolve) => {
        const furniture = await this.getById(furnitureId, {
          loadPhotos: true,
        });

        if (furniture === null) {
          return resolve(null);
        }

        this.db
          .beginTransaction()
          .then(() => {
            const promises = [];

            for (const uploadedPhoto of uploadedPhotos) {
              promises.push(
                this.db.execute(
                  `INSERT photo SET furniture_id = ?, image_path = ?;`,
                  [furnitureId, uploadedPhoto.imagePath]
                )
              );
            }

            Promise.all(promises)
              .then(async () => {
                await this.db.commit();

                resolve(
                  await this.services.furnitureService.getById(furnitureId, {
                    loadCategory: true,
                    loadPhotos: true,
                    loadPrices: true,
                  })
                );
              })
              .catch(async (error) => {
                await this.db.rollback();

                resolve({
                  errorCode: error?.errno,
                  errorMessage: error?.sqlMessage,
                });
              });
          })
          .catch(async (error) => {
            await this.db.rollback();

            resolve({
              errorCode: error?.errno,
              errorMessage: error?.sqlMessage,
            });
          });
      }
    );
  }

  public async getAllByCategoryId(
    categoryId: number
  ): Promise<FurnitureModel[]> {
    return (await this.getAllByFieldNameFromTable<FurnitureModelAdapterOptions>(
      "furniture",
      "category_id",
      categoryId,
      {
        loadPhotos: true,
      }
    )) as FurnitureModel[];
  }
}

export default FurnitureService;
