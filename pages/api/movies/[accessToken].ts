import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { verifyJwtAccessToken } from "@/hooks/useJwtToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }



   const { accessToken } = req.query;
    const decoded = verifyJwtAccessToken(accessToken as string);
    if(!decoded){
      throw new Error('Invalid Access Token');
    }
    const movieId = decoded.movieId;
    const emailExists = decoded.email;
    if(emailExists == undefined){
      const user = await serverAuth(req, res);
    }
    else{
      console.log("Email Exists",emailExists);
    }
    if (typeof movieId !== 'string') {
      throw new Error('Invalid Movie Id Type');
    }

    if (!movieId) {
      throw new Error('Missing Movie Id In Database');
    }

    const movie = await prismadb.movie.findUnique({
      where:{
        id: movieId
       }
    });

    if (!movie) {
    throw new Error('Missing Movie');
    }
    return res.status(200).json(movie);
  } 
  catch (error) {
    console.log(error);       
    return res.status(500).end();
  }
}