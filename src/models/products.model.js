import { Schema, model } from "mongoose";
const productSchema = new Schema({
    barcode:{
        type:String,
        unique:true,
        required:true
    },
    description:String,
    price:Number
},{
    versionKey:false,
    timestamps:true
})

export default model('product', productSchema)