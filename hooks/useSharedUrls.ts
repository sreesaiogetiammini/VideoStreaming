import useSWR from 'swr'

import fetcher from '@/lib/fetcher'


const useSharedUrls = () => {
    const{ data ,error,isLoading,mutate} = useSWR('/api/sharedurls',fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {data,error,isLoading,mutate}
};

export default useSharedUrls;