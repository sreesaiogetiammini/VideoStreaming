"use client";

import HomeBoard from "@/components/homeboard";
import MoviesRow from "@/components/movierows";
import Navbar from "@/components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import ErrorPage from "../error";


const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading,error } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  if (error) {
    return(
      <>
       <ErrorPage/>
      </>
    )
  }


  if (!data?.searchList) {
    return null;
  }

  return (
    <>
    <div className="pb-40">
    <Navbar/>
    </div>

    
     <div> 
      <span className="text-xl text-fuchsia-100">
        Showing results for:{" "}
        <span className="font-semibold text-fuchsia-100">{searchQuery}</span>
      </span>
      <div className="pb-40">
       <MoviesRow title="" data={data?.searchList}/>
       </div>
     </div>
     

    </>
  );
};

export default SearchPage;