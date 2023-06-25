import React from 'react'
import multiparty from 'multiparty';

async function handle(req, res) {

    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, async(err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        });
    });
    
    console.log(files);
    console.log(fields);
    return res.json('ok');
}

export default handle

export const config = {
    api: {bodyParser: false}
}