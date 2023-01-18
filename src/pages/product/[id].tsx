import { withCSR } from '@/hooks/with-csr';
import { useRouter } from 'next/router';
import React from 'react';
import {
    dehydrate,
    QueryClient,
    useInfiniteQuery,
    useQuery,
} from 'react-query';

export default function SearchResult() {
    // ** Hook
    const router = useRouter();

    const productId = router.query?.id;

    const { data, isSuccess, isLoading } = useQuery(
        ['product', productId],
        async () =>
            await fetch(
                `https://core.basalam.com/api_v2/product/${53610}/cache`
            ).then((result) => result.json()),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            retryOnMount: false,
        }
    );
    return (
        <div className="h-screen mt-15">
            <div>{data?.title}</div>
        </div>
    );
}

export const getServerSideProps = withCSR(async (context) => {
    const queryClient = new QueryClient();
    const productId = context.query?.id;
    await Promise.all([
        queryClient.prefetchQuery(
            ['product', productId],
            async () =>
                await fetch(
                    `https://core.basalam.com/api_v2/product/${53610}/cache`
                ).then((result) => result.json())
        ),
    ]);
    return { props: { dehydratedState: dehydrate(queryClient) } };
});
