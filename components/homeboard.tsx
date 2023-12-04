import React, { useCallback } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import useHomeBoard from '@/hooks/useHomeBoard';
import PlayButton from './playbutton';
import NextAuth, { AuthOptions } from 'next-auth';
import { getToken } from "next-auth/jwt"
import ShareButton from './sharebutton';
import useCurrentUser from '@/hooks/useCurrentUser';






const HomeBoard : React.FC = () => {
  
  const { data: curentuser } = useCurrentUser();
  const { data } = useHomeBoard();
  return (

    
    <div className="relative h-[46.25vw]">
      <video poster={data?.thumbnailUrl} className="w-full h-[46.25vw] object-cover brightness-[60%] transition duration-500" autoPlay muted loop src={data?.videoUrl}></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton  movieId={data?.id}/>
            {curentuser !== undefined && curentuser.email !== "guest@gmail.com" && <ShareButton movieId={data?.id} userbalance={curentuser.currentBalance} movieCost={data?.rentCost}/>}
          
            
        </div>
      </div>
    </div>
  )
}
export default HomeBoard;