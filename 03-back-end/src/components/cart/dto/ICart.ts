import Ajv from "ajv";

const ajv = new Ajv();

interface IAddToCart {
    furnitureId: number;
    quantity: number;
}

const IAddToCartValidator = ajv.compile({
    type: "object",
    properties: {
        furnitureId: {
            type: "integer",
            minimum: 1,
        },
        quantity: {
            type: "integer",
            minimum: 0,
        },
    },
    required: [
        "furnitureId",
        "quantity",
    ],
    additionalProperties: false,
});

export default IAddToCart;
export { IAddToCartValidator };