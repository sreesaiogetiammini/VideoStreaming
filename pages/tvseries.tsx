import HomeBoard from "@/components/homeboard";
import MoviesRow from "@/components/movierows";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovies from "@/hooks/useMovieList";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"


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


export default function TVSeries() {
  const {data: movies = []} = useMovies();

  return (
    <>
    <Navbar/>
    <HomeBoard/>
    <div className="pb-40">
    <MoviesRow title="TV Series" data={movies}/>
    </div>

    </>
  
  )
}