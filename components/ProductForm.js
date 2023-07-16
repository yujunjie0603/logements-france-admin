import Layout from "@/components/Layout"
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner"
import {ReactSortable} from "react-sortablejs";
import categories from "@/pages/categories";

function ProductForm(
    {
        _id,
        title: existingTitle,
        description: existingDescription, 
        price: existingPrice,
        images: existingImages,
        category:assignedCategory,
        properties:assignedProperties,
    }
    ) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProduct, setGoToProduct] = useState(false);
    const [productProperties,setProductProperties] = useState(assignedProperties || {});
    const [images, setImages] = useState(existingImages || '');
    const [isUploading,setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(assignedCategory || '');
    const Router = useRouter();
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {title, description, price, images, category, 
            properties:productProperties
        };
        if (_id) {
            await axios.put('/api/products', {...data, _id});
        } else {
            await axios.post('/api/products', data);
        }
        setGoToProduct(true);
    }
    if (goToProduct) {
        Router.push('/products');
    }
    function setProductProp(propName,value) {
        setProductProperties(prev => {
          const newProductProps = {...prev};
          newProductProps[propName] = value;
          return newProductProps;
        });
      }
    useEffect( () => {
        axios.get("/api/categories").then(response => {
            console.log(response.data);
            setCategories(response.data);
        });
    }, [])

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
        <form onSubmit={saveProduct}>
            <label>Name : </label>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)} />
            <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
                <option value="">No Category</option>
                {categories.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}            
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
            <div key={p.name} className="">
                <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                <div>
                <select value={productProperties[p.name]}
                        onChange={ev =>
                            setProductProp(p.name,ev.target.value)
                        }
                >
                    {p.values.map(v => (
                    <option key={v} value={v}>{v}</option>
                    ))}
                </select>
                </div>
            </div>
            ))}            
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
            <label>description : </label>
            <textarea placeholder="description" onChange={ev => setDescription(ev.target.value)} value={description} />
            <label>price : </label>
            <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary" type="submit"> Save </button>
        </form>
    )
}

export default ProductForm