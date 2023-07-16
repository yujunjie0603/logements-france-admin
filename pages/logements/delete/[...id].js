import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

function DeleteLogementPage() {

    const router = useRouter();
    const {id} = router.query;
    const [logement, setLogement] = useState();
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/api/logements?id=" + id).then(response => {
            setLogement(response.data);
        });

    }, [id])

    function goBack(){
        router.push('/logements');
    }

    async function deleteLogement()
    {
        await axios.delete('/api/logements?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className='text-center'>
                
                Do you really want to delete logements : {logement?.name_resident} ?
            </h1>
            <div className='flex gap-2 text-center'>

                <button className='btn-red' onClick={deleteLogement}>
                    Yes
                </button>
                <button onClick={goBack} className='btn-default'>
                    No
                </button>
            </div>
        </Layout>
    )
}

export default DeleteLogementPage