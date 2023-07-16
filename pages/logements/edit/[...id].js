import ProductForm from '@/components/ProductForm';
import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import LogementForm from '@/components/LogementForm';

function EditLogementPage() {

    const [logementInfo, setLogementInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id) {
            return ;
        }
        axios.get('/api/logements?id=' + id).then(response => {
            
            setLogementInfo(response.data);
        })
    }, [id])
    return (
        <Layout>
            <h1>Edit logement</h1>
            {logementInfo && (
                <LogementForm {...logementInfo} />
            )}
        </Layout>
    )
}

export default EditLogementPage