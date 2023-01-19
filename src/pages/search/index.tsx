import * as React from 'react';
import Seo from '@/components/Seo';
import { withCSR } from '@/hooks/with-csr';
import {
    dehydrate,
    InfiniteData,
    QueryClient,
    useInfiniteQuery,
    useQuery,
} from 'react-query';
import SearchList from '@/components/search/list';
import { useRouter } from 'next/router';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

interface ProductResult {
    correction: any;
    didYouMean: any;
    facets: {
        category_list: Array<{ id: number; title: string; slug: string }>;
    };
    inputChanges: any;
    meta: any;
    metadata: any;
    products: Array<any>;
    selectedCategoryList: any;
    selectedFilters: {
        categories: Array<{
            id: number;
            title: string;
            slug: string;
            parent_id: number;
            children: Array<any>;
        }>;
    };
    similar_vendors: { count: number; vendors: Array<any> };
    suggestions: [];
}
const LIMIT = 20;
export default function SearchResult() {
    //** Hooks
    const router = useRouter();
    const q = router.query?.q;

    const fetchRepositories = async (page) => {
        sessionStorage.removeItem('searchScroll');
        const response = await fetch(
            `https://search.basalam.com/ai-engine/api/v2.0/product/search?productAds=true&adsImpressionDisable=false&q=${q}&literal=false&from=${
                (page - 1) * LIMIT
            }&size=${LIMIT}&filters.hasDiscount=false&filters.isReady=false&filters.isExists=true&filters.hasDelivery=false&filters.vendorScore=false&filters.hasVideo=false&filters.queryNamedTags=false`
        );
        return response.json();
    };

    const {
        data,
        isLoading: isLoadingComments,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<ProductResult>(
        ['search', `${router?.query?.q}`],
        ({ pageParam = 1 }) => fetchRepositories(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                return nextPage;
            },
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            retryOnMount: false,
        }
    );
    const newData = data?.pages?.map((pg) => pg?.products);

    return (
        <>
            <Seo />
            <main className='bg-white'>
                <SearchList
                    data={
                        data?.pages ? newData?.flat() : (data as any)?.products
                    }
                    isSuccess={isSuccess}
                    fetchNextPage={fetchNextPage}
                    limit={LIMIT}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </main>
        </>
    );
}

export const getServerSideProps = withCSR(async (context) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    const queryClient = new QueryClient();
    const q = context.query?.q;
    await Promise.all([
        queryClient.prefetchQuery(
            ['search', q],
            async () =>
                await fetch(
                    `https://search.basalam.com/ai-engine/api/v2.0/product/search?productAds=true&adsImpressionDisable=false&q=${q}&literal=false&from=0&size=${LIMIT}&filters.hasDiscount=false&filters.isReady=false&filters.isExists=true&filters.hasDelivery=false&filters.vendorScore=false&filters.hasVideo=false&filters.queryNamedTags=false`
                ).then((result) => result.json())
        ),
    ]);
    return { props: { dehydratedState: dehydrate(queryClient) } };
});
