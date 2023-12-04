import React from 'react'
import { signOut } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser';


interface AccountBoxParams{
    visible: boolean;
}

const AccountBox:React.FC<AccountBoxParams> = ({visible}) => {
    const { data: curentuser } = useCurrentUser();
    if(!visible){
        return null;
    }
  return (


    
    <div className='bg-black w-80 absolute top-14 right-2 py-5 flex-col border-2 border-gray-800 flex'>
        <div className=' flex flex-col gap-3'>
            <div className=' px-3 group/item flex flex-row gap-3 items-center w-full'>
                <img className= 'w-12 rounded-full'src='images/man.png' alt='profile logo'></img>
                <div>
                    <div  className='text-center text-white text-2xl'>{curentuser?.name}</div>
                    <div onClick={()=> signOut()} className='text-center text-white text-2xl hover:underline'>Logout</div>
                </div>
            </div>
           
        </div>
      
    </div>
  )
}

export default AccountBox
