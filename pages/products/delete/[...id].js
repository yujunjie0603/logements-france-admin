import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

function DeleteProductPage() {

    const router = useRouter();
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState();
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/api/products?id=" + id).then(response => {
            setProductInfo(response.data);
        });

    }, [id])

    function goBack(){
        router.push('/products');
    }

    async function deleteProduct()
    {
        await axios.delete('/api/products?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className='text-center'>
                
                Do you really want to delete product : {productInfo?.title} ?
            </h1>
            <div className='flex gap-2 text-center'>

                <button className='btn-red' onClick={deleteProduct}>
                    Yes
                </button>
                <button onClick={goBack} className='btn-default'>
                    No
                </button>
            </div>
        </Layout>
    )
}

export default DeleteProductPage