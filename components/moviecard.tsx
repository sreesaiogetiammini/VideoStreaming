import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { icons } from 'react-icons';
import {FaPlay} from 'react-icons/fa';
import FavoriteButton from './favoritebutton';
import { BiShareAlt } from "react-icons/bi";
import ShareEmailDialog from './shareemaildialog';
import ShareButton from './sharebutton';
import ShareCardButton from './sharecardbutton';
import { signJwtAccessToken } from '@/hooks/useJwtToken';
import useCurrentUser from '@/hooks/useCurrentUser';
interface MovieCardParams {
    data: Record<string,any>;
}

const MovieCard: React.FC<MovieCardParams> = ({data}) => {
 
    const router = useRouter();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
      setDialogOpen(true);
    };
  
    const closeDialog = () => {
      setDialogOpen(false);
    };

    const tokenPayload = {
      movieId: data.id,
    };
    const accessToken = signJwtAccessToken(tokenPayload)

    const { data: curentuser } = useCurrentUser();
  return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
          <img src={data.thumbnailUrl} alt="Movie" draggable={false} className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-full
            h-[12vw]
          " />

    <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <img src={data?.thumbnailUrl} alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
        " />
        <div className='
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md'>

        <div className='flex flex-row items-center gap-4'>
           <div
           onClick={() => router.push(`/watch/${accessToken}`)}
           className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <FaPlay className="text-black w-4 lg:w-6" />
            </div>

            {curentuser !== undefined &&  curentuser.email !== "guest@gmail.com" && (
              <div>
                <FavoriteButton movieId={data?.id} />
              </div>
            )}
            {curentuser !== undefined && curentuser.email !== "guest@gmail.com" && (
              <div>
              <ShareCardButton movieId={data?.id} userbalance={curentuser.currentBalance} movieCost={data?.rentCost} />
                </div>
            )}
          
          
        </div>
          <div className="flex flex-row mt-4 gap-2 items-center"> 
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
        </div>
     </div>
    </div>
  )
}

export default MovieCard
