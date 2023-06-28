import {mongooseConnect} from "@/lib/mongoose"
import {Category} from '@/models/Category';

async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    if (method === 'POST') {
        const {name, parentCategory, properties} = req.body;
        const categoryDoc = await Category.create({
            name, 
            parent: parentCategory || undefined, 
            properties,
        });
        res.json(categoryDoc);
    }

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    if (method === 'PUT') {
        const {name, parentCategory, properties, _id} = req.body;
        console.log(req.body)
        const categoryDoc = await Category.updateOne({_id}, 
            {name, 
            parent: parentCategory || undefined, 
            properties,
        });
        res.json(categoryDoc);
    }

    if (method === 'DELETE') {
        if (req.query?._id) {
            const _id = req.query?._id;
            await Category.deleteOne({_id});
            res.json(true);
        }
    }
}

export default handle