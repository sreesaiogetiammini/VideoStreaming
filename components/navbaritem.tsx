import { redirect } from 'next/dist/server/api-utils';
import React from 'react'
import { useRouter } from 'next/router';
interface NavBarItemProps{
    label :string;
}



const NavBarItem : React.FC<NavBarItemProps> = ({label}) => {
    const router = useRouter();

    const clickNavItemButton = () => {
        if(label === 'My List'){
            router.push('/mylist');
        }
        else if (label === 'Movies'){
            router.push('/movies');
        }
        else if (label === 'TV Series'){
            router.push('/tvseries');
        }
        else{
            router.push('/');
        }
    }


  return (
    <div className='text-white cursor-pointer hover:text-gray-200 transition-all' onClick= {clickNavItemButton}
   
    >
      {label}
    </div>
  )
}

export default NavBarItem
