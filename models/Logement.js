import mongoose, {model, Schema, models} from "mongoose";


const LogementsSchema = new Schema({
    
    name_resident: {type:String, require: true},
    description: String,
    type_apartment: {type:String, require: true},
    price_origin_apartment: {type: String},
    price_promo_apartment: {type: String},
    adress: {type:String, require: true},
    cp: {type:String, require: true},
    city: {type:String, require: true},
    images: [{type:String}],
    info_apartment: String,
    tels: [{type:String}],
    advantages: [{type:String}],
    services_include: [{type:String}],
    services_carte: [{type:String}],
    category: {
        type:mongoose.Types.ObjectId, ref: 'Category'
    },
    properties: {type:Object},
}, {
    timestamps: true,
  });

export const Logement = models.Logement || model('Logement', LogementsSchema);