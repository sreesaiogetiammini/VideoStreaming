import HomeBoard from "@/components/homeboard";
import MoviesRow from "@/components/movierows";
import Navbar from "@/components/navbar";
import useFavorites from "@/hooks/useFavorites";
import useMovies from "@/hooks/useMovieList";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import ErrorPage from "./error";
import useCurrentUser from "@/hooks/useCurrentUser";


export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return{
    props: {}
  }
}



export default function Home() {
    const {data: movies = [],error} = useMovies();
    const {data: favorites = []} = useFavorites();
    const { data: curentuser} = useCurrentUser();
    if(error){
      return(
        <>
         <ErrorPage/>
        </>
      )
    }
   
 
  return (
    <>
    <div className="pb-40">
    <Navbar/>
    <HomeBoard/>
    </div>
    <div>
    <MoviesRow title="Trending Now" data={movies}/>
    {curentuser !== undefined && curentuser.email !== "guest@gmail.com" && <MoviesRow title="My List" data={favorites}/>}
    <MoviesRow title="International Movies" data={movies}/>
    </div>

    </>
  
  )
}
