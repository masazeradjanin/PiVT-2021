import FurnitureModel from "../../../03-back-end/src/components/furniture/model";
import api from "../api/api";
export default class FuritureService {
  public static getAll(): Promise<FurnitureModel[]> {
    return new Promise<FurnitureModel[]>((resolve) => {
      api("get", "/furniture", "user", undefined, true)
        .then((res) => {
          console.log(res);
          if (res?.status !== "ok") return resolve([]);

          resolve(res.data as FurnitureModel[]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}
