import { NextApiRequest,NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'

import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest,res: NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try{ 
        const user = await serverAuth(req,res);
        const noOfMovies = await prismadb.movie.count({
            where: {
              guest: true,
            },
          });
        const randomIndex = Math.floor(Math.random() * noOfMovies);
        if(user.currentUser.email === 'guest@gmail.com'){
            const randomMovies = await prismadb.movie.findMany({
                where :{
                    guest : true
                },
                take :1,
                skip: randomIndex
            });
            return res.status(200).json(randomMovies[0]);
        }
        else{
            const randomMovies = await prismadb.movie.findMany({
                take :1,
                skip: randomIndex
            });
            return res.status(200).json(randomMovies[0]);
        }
       
       
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).end();
    }
}