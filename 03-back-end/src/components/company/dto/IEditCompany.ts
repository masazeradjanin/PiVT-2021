import Ajv from "ajv";

interface IEditCompany {
   
    name: string;
}
interface IEditLocation {
    address: string;
    latitude: number;
    logitude: number;
}

const ajv = new Ajv();
const IEditCompanyValidator = ajv.compile({
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

const IEditLocationValidator = ajv.compile({
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

export { IEditCompany };
export { IEditCompanyValidator };
export { IEditLocationValidator };
export { IEditLocation };