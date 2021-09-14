
  
import Ajv from "ajv";


interface IEditFurniture {
    title: string;
    description: string;
    descriptionCons: string;
    dimensions: string;
    color: string;
    material: string;
    isAvailable: boolean;
    price: number;
    categoryId: number;
    locationId: number;
  
}

const ajv = new Ajv();

const IEditFurnitureValidator = ajv.compile({
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
      
        description: {
            type: "string",
            minLength: 2,
            maxLength: 64 * 1024,
        },
        descriptionCons: {
            type: "string",
            minLength: 2,
            maxLength: 64 * 1024,
        },
        dimensions: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        color: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        material: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        isAvailable: {
            type: "boolean",
        },

        price: {
            type: "number",
            minimum: 0.01,
            multipleOf: 0.01,
        },
        categoryId: {
            type: "integer",
            minimum: 1,
        },
        locationId: {
            type: "integer",
            minimum: 1,
        },
    },
    required: [
        "title",
        "description",
        "descriptionCons",
        "dimensions",
        "color",
        "material",
        "isAvailable",
        "price",
        "categoryId",
        "locationId",
    ],
    additionalProperties: false,
});

export { IEditFurniture };
export { IEditFurnitureValidator };
