import Layout from "@/components/Layout"
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner"
import {ReactSortable} from "react-sortablejs";
import categories from "@/pages/categories";

function LogementForm(
    {
        _id,
        name_resident: existingNameResident,
        type_apartment: existingTypeApartment,
        price_origin_apartment: existingPriceOriginApartment,
        price_promo_apartment: existingPricePromoApartment,
        adress: existingAdress,
        images: existingImages,
        info_apartment: existingInfoApartment,
        tels: existingTels,
        advantages: existingAdvantages,
        services_include: existingServicesInclude,
        services_carte: existingServicesCarte
    }
    ) {
    const [nameResident, setNameResident] = useState(existingNameResident || '');
    const [typeApartment, setTypeApartment] = useState(existingTypeApartment || '');
    const [priceOriginApartment, setPriceOriginApartment] = useState(existingPriceOriginApartment || '');
    const [pricePromoApartment, setPricePromoApartment] = useState(existingPricePromoApartment || '');
    const [adress, setAdress] = useState(existingAdress || '');
    const [infoApartment, setInfoApartment] = useState(existingInfoApartment || '');
    const [tels, setTels] = useState(existingTels || '');
    const [advantages, setAdvantages] = useState(existingAdvantages || '');
    const [servicesInclude, setServicesInclude] = useState(existingServicesInclude || '');
    const [servicesCarte, setServicesCarte] = useState(existingServicesCarte || '');
    const [goToLogement, setGoToLogement] = useState(false);
    const [images, setImages] = useState(existingImages || '');
    const [isUploading,setIsUploading] = useState(false);
    const Router = useRouter();
    async function saveLogement(ev) {
        ev.preventDefault();
        const data = {
            name_resident: nameResident, 
            type_apartment: typeApartment, 
            price_origin_apartment: priceOriginApartment, 
            price_promo_apartment: pricePromoApartment, 
            adress, 
            info_apartment: infoApartment};
        if (_id) {
            await axios.put('/api/logements', {...data, _id});
        } else {
            await axios.post('/api/logements', data);
        }
        setGoToLogement(true);
    }
    if (goToLogement) {
        Router.push('/logements');
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
          setIsUploading(true);
          const data = new FormData();
          for (const file of files) {
            data.append('file', file);
          }
          const res = await axios.post('/api/upload', data);

        //   setImages(oldImages => {
        //     return [...oldImages, ...res.data.links];
        //   });
          setIsUploading(false);
        }
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
      let catInfo = categories.find(({_id}) => _id === category);
      propertiesToFill.push(...catInfo.properties);
      while(catInfo?.parent?._id) {
        const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
        propertiesToFill.push(...parentCat.properties);
        catInfo = parentCat;
      }
    }

    return (
        <form onSubmit={saveLogement}>
            <label>Name : </label>
            <input type="text" placeholder="logement name" value={nameResident} onChange={ev => setNameResident(ev.target.value)} />      
            <label>
                Photos
            </label>
            <div className="mb-2">
                <label className="w-32 h-32 border text-center flex items-center justify-normal text-sm">
                    upload
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <input type="file" className="hidden" onChange={uploadImages} />
                </label>
                {!images?.length && (
                    <div> No Images </div>
                )}

            </div>
            <label>info Apartment : </label>
            <textarea placeholder="info Apartment" onChange={ev => setInfoApartment(ev.target.value)} value={infoApartment} />
            <label>priceOriginApartment : </label>
            <input type="number" value={priceOriginApartment} onChange={ev => setPriceOriginApartment(ev.target.value)} />
            <label>pricePromoApartment : </label>
            <input type="number" value={pricePromoApartment} onChange={ev => setPricePromoApartment(ev.target.value)} />
            <button className="btn-primary" type="submit"> Save </button>
        </form>
    )
}

export default LogementForm