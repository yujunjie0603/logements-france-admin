import clientPromise from "@/lib/mongodb";
import axios from "axios";
import mongoose from "mongoose";
import {Logement} from "@/models/Logement"
import {mongooseConnect} from "@/lib/mongoose"
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req, res);
    if (method === 'GET') {
        if (req.query?.id) {
          res.json(await Logement.findOne({_id:req.query.id}));
        } else {
          res.json(await Logement.find());
        }
      }
    if (method === 'POST') {
        const {
          name_resident,
          type_apartment,
          price_origin_apartment,
          price_promo_apartment,
          adress,
          cp,
          city,
          images,
          info_apartment,
          tels,
          advantages,
          services_include,
          services_carte
        } = req.body;
        const logementDoc = await Logement.create({
          name_resident,
          type_apartment,
          price_origin_apartment,
          price_promo_apartment,
          adress,
          cp,
          city,          
          images,
          info_apartment,
          tels,
          advantages,
          services_include,
          services_carte
        })
        res.json(logementDoc);
    }
    
    if (method === 'PUT') {
      const {
        name_resident,
        description,
        type_apartment,
        price_origin_apartment,
        price_promo_apartment,
        adress,
        cp,
        city,        
        images,
        info_apartment,
        tels,
        advantages,
        services_include,
        services_carte,
        _id
      } = req.body;
        try{
          await Logement.updateOne({_id}, {name_resident,
            description,
            type_apartment,
            price_origin_apartment,
            price_promo_apartment,
            adress,
            cp,
            city,          
            images,
            info_apartment,
            tels,
            advantages,
            services_include,
            services_carte
          }).then((obj) => {
            console.log('Updated - ' + JSON.stringify(obj));
          }).catch((err) => {
            console.log('Error: ' + err);
          });
        } catch (error) {
          console.log(error);
        }
        res.json(true);
      }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Logement.deleteOne({_id: req.query?.id});
            res.json(true);
        }
    }
    
}