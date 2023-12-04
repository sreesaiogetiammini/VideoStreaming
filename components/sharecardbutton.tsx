import React ,{ useState } from 'react';
import { getSession, signOut } from "next-auth/react"
import { BiShareAlt } from "react-icons/bi";
import { useRouter } from 'next/router';
import ShareEmailDialog from './shareemaildialog';


  interface ShareCardButtonProps {
    movieId: string;
    movieCost:number;
    userbalance:number;
  }
  

 
  const ShareCardButton: React.FC<ShareCardButtonProps> = ({ movieId,movieCost,userbalance }) => {
    const router = useRouter();
    
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
      setDialogOpen(true);
    };
  
    const closeDialog = () => {
      setDialogOpen(false);
    };

  return (
    <>

      <button 
         className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
         onClick={openDialog}
        >
        <BiShareAlt className="text-white size={25}"/>    
        </button>
        <ShareEmailDialog movieCost={movieCost} userbalance={userbalance} shareMovieId={movieId} isOpen={isDialogOpen} onClose={closeDialog}  />
        </>

  );
}

export default ShareCardButton;