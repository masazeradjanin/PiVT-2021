import Ajv from "ajv";


interface IAddCategory{
    name: string;
    imagePath: string;
    parentCategoryId: number | null;
}

const ajv = new Ajv();

const IAddCategoryValidator = ajv.compile({
type: "object",
properties:{
    name:{
        type:"string",
        miniLength: 2,
        maxLength:128,
    },
    imagePath:{
        type:"string",
        maxLength: 128,
        pattern:"\.(png|jpg)$",

    },
    parentCategoryId:{
        type:["integer", "null"],
        minimum: 1,

    },
    },
    required: ["name", "imagePath",],
    additionalProperties: false,
});

export {IAddCategory};
export {IAddCategoryValidator};