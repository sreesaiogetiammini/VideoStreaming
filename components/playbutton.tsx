import React from 'react';
import { BiPlay } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { signJwtAccessToken } from '@/hooks/useJwtToken';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  const tokenPayload = {
    movieId: movieId,
  };
  const accessToken = signJwtAccessToken(tokenPayload)

  return (
    <div>
    <button 
    onClick={() => router.push(`/watch/${accessToken}`)}  
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
      >
        <BiPlay/>
        Play
    </button>
    </div>
  );
}

export default PlayButton;