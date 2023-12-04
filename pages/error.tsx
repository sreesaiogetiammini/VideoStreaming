import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";



const ErrorPage = () => {

  const router = useRouter();
 
  return (
    <div className="flex items-center h-full justify-center"> 
     <div className="flex flex-col">
     <h1 className=" text-4xl md:text-5xl text-white text-center"> Looks Like You got Some Error Stuff</h1>
      <h1 className=" text-4xl md:text-5xl text-white text-center"> Sorry for Trouble !!! </h1>
      <h1 className=" text-4xl md:text-5xl text-white text-center"> Please Visit us Again </h1>
     <div className="flex items-center justify-center gap-8 mt-10">
      <div onClick={() => {router.push('/auth')}}>
        <div className="group flex-row w-44 mx-auto">
          <div 
          className="w-44
          h-44
          rounded-md
          flex
          items-center
          justify-center
          border-2
          border-transparent
          group-hover: cursor-pointer
          overflow-hidden
          ">
            <img className="h-full rounded-full" src="/images/man.png" alt="man profile"></img>
          </div>
          <div 
          className="mt-4
          text-gray-400
          text-3xl
          text-center
          group-hover:text-white
          ">
          Captstone Project by Sree Sai
          </div>
        </div>
      </div>
     </div>
     
     </div>
    </div>
  )
}

export default ErrorPage
