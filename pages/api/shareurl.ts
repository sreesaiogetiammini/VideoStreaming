import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { verifyJwtAccessToken } from "@/hooks/useJwtToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method !== 'POST'){
      return res.status(405).end();
    }

    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req,res);

      const { accessToken } = req.body;
      const decoded = verifyJwtAccessToken(accessToken as string);
      if(!decoded){
        throw new Error('Invalid Access Token or Token Expired');
      }
      const decodedMovieId = decoded.movieId;
      const decodecEmail = decoded.email;
      const decodedExpiryDate = decoded.exp;
    
      const emailExistsInTokens = currentUser.sharedAccessTokens.some((token) => {
        try {
          const decoded2 = verifyJwtAccessToken(token);
          const currentTimestamp = Math.floor(Date.now() / 1000);
          console.log("Expiry Check ",currentTimestamp < decodedExpiryDate);
          return decoded2!!.email === decodecEmail && currentTimestamp < decodedExpiryDate;
        } 
        catch (error) {
          console.error('Error decoding token', error);
          return false;
        }
      });

      if (emailExistsInTokens) {
        // No need to Add Shared Url Tell User that it is already Shared and Not Expired
        return res.status(204).end();
      } 
      else {
        console.log(`The email ${decodecEmail} does not exist in any token.`);
        const existingMovie = await prismadb.movie.findUnique({
          where: {
            id: decodedMovieId,
          }
        });
        if (!existingMovie) {
          throw new Error('Invalid User ID');
        }
        const rentCost = existingMovie.rentCost ?? 0; 
        const currentBalance = currentUser?.currentBalance ?? 0; 
        const updatedBalance = currentBalance - rentCost;
        const accessTokenString = accessToken.toString();
        const user = await prismadb.user.update({
          where: {
            email: currentUser.email || '',
          },
          data: {
            currentBalance: updatedBalance,
            sharedAccessTokens: {
              push:accessTokenString
            },
          },
        });
    
        return res.status(200).json(user);
      }
    }


  } 
  
  catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}