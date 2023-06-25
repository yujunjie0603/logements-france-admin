import mongoose, {model, Schema, models} from "mongoose";


const ProductSchema = new Schema({
    title: {type:String, require: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
});

export const Product = models.Product || model('Product', ProductSchema);