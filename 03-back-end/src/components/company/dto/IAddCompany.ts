import Ajv from "ajv";

interface IAddCompany {
   
    name: string;
}
interface IAddLocation {
    address: string;
    latitude: number;
    logitude: number;
}

const ajv = new Ajv();

const IAddCompanyValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 8,
            maxLength: 64,
        },
    }, 
        
    required: [
        "name", 
    ],
    additionalProperties: false,
});

const IAddLocationValidator = ajv.compile({
    type: "object",
    properties: {
        adress: {
            type: "string",
            minLength: 8,
            maxLength: 128,
        },
        latitude: {
            type: "number",
            minimum: 0.00000001,
            multipleOf: 0.00000001,
        },
        longitude: {
            type: "number",
            minimum: 0.00000001,
            multipleOf: 0.00000001,
        },
    }, 
        
    required: [
        "adress",
        "latitude",
        "longitude", 
    ],
    additionalProperties: false,
});

export { IAddCompany };
export { IAddCompanyValidator };
export { IAddLocationValidator };
export { IAddLocation };