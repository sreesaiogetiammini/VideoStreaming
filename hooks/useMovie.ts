import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const crypto = require('crypto');


const useMovie = (id?: any) => {
  const { data, error, isLoading } = useSwr(id  ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;