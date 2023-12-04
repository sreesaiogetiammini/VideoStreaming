import prismadb from '@/lib/prismadb'

import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest,res: NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try{ 
        await serverAuth(req,res);

        const {q:query}= req.query
       
        if(typeof query !== "string"){
            throw new Error("Invalid Request");
        }

        const searchList = await prismadb.movie.findMany({
           where:{
            OR:[
                {
                    title:{
                        contains:query,
                        mode:"insensitive"
                    },

                },
                {
                    description:{
                        contains:query,
                        mode:"insensitive"
                    }
                }
            ]
           }
        });
        return res.status(200).send({searchList});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).end();
    }   
}