// import React , {useState} from 'react';
// import { useRouter } from 'next/router';
// import useMovie from '@/hooks/useMovie';
// import {AiOutlineArrowLeft} from 'react-icons/ai'
// import ErrorPage from '../error';
// import { verifyJwtAccessToken } from '@/hooks/useJwtToken';
// import prismadb from '@/lib/prismadb';
// import Input from '@/components/input';
// import ShareEmailDialog from '@/components/shareemaildialog';


// const Watch = () => {
//   const router = useRouter();
//   const { accessToken } = router.query || "";
//   const { data,error } = useMovie(accessToken);
//   if(error){
//     return(
//       <>
//        <ErrorPage/>
//       </>
//     )
//   }
//   else{
//     return (
//       <div className="h-screen w-screen bg-black">
//         <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
//         <AiOutlineArrowLeft onClick = {() => router.push('/')} className = 'text-white cursor-pointer' size ={40}/>
//         <p className="text-white text-1xl md:text-3xl font-bold">
//             <span className="font-light">Watching:</span> {data?.title}
//           </p>
//         </nav>
//         <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
//       </div>
//     )
//    }
  
// }

// export default Watch;


import { useState } from 'react';
import { useRouter } from 'next/router';
 import { verifyJwtAccessToken } from '@/hooks/useJwtToken';
 import useMovie from '@/hooks/useMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ErrorPage from '../error';

const Watch = () => {
  const router = useRouter();
  const { accessToken } = router.query || "";
  const { data, error } = useMovie(accessToken);
  const decoded = verifyJwtAccessToken(accessToken as string);
  const emailExists = decoded?.email;

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
 

  const handleEmailVerification = () => {
    if(emailExists=== email){
      setIsEmailValid(true);
    }
    else{
      setIsEmailValid(false);
    }
   
  };

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  } else if (emailExists !== undefined && !isEmailValid ) {
    // Render email input form
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black bg-opacity-80">
        <div className="bg-white p-8 rounded-md">
          <p className="text-2xl font-bold mb-4">Enter your email to continue</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md py-2 px-3"
          />
          <button onClick={handleEmailVerification} className="mt-4 bg-blue-500 text-white rounded-md py-2 px-4">
            Continue
          </button>
          {
            isEmailValid == false &&  email.length > 3 && (
              <div style={{ color: "red" }}>
              Please enter a valid email address.
              </div>
            )
          }
         

        </div>
      </div>
    );
  } else {
    // Render video player
    return (
      <div className="h-screen w-screen bg-black">
        <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
          <AiOutlineArrowLeft onClick={() => router.push('/')} className='text-white cursor-pointer' size={40} />
          <p className="text-white text-1xl md:text-3xl font-bold">
            <span className="font-light">Watching:</span> {data?.title}
          </p>
        </nav>
        <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
      </div>
    );
  }
};

export default Watch;
