import ProductForm from '@/components/ProductForm';
import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'

function EditProductPage() {

    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id) {
            return ;
        }
        axios.get('/api/products?id=' + id).then(response => {
            
            setProductInfo(response.data);
            
        })
    }, [id])
    console.log(productInfo);
    console.log('------------------------');
    return (
        <Layout>
            <h1>Edit product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}

export default EditProductPage