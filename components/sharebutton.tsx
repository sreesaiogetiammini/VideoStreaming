import React ,{ useState } from 'react';
import { getSession, signOut } from "next-auth/react"
import { BiShareAlt } from "react-icons/bi";
import { useRouter } from 'next/router';
import ShareEmailDialog from './shareemaildialog';


  interface ShareButtonProps {
    movieId: string;
    movieCost:number;
    userbalance:number;
  }
  

 
  const ShareButton: React.FC<ShareButtonProps> = ({ movieId,movieCost,userbalance  }) => {
    const router = useRouter();
    
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
      setDialogOpen(true);
    };
  
    const closeDialog = () => {
      setDialogOpen(false);
    };

  return (
    <div>
      <button 
      className='  bg-white
      text-white
        bg-opacity-30 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-opacity-20
        transition'
        onClick={openDialog}
        >
        <BiShareAlt/>    
         Share
        </button>
        <ShareEmailDialog movieCost={movieCost} userbalance={userbalance} shareMovieId={movieId} isOpen={isDialogOpen} onClose={closeDialog}  />
        </div>

  );
}

export default ShareButton;