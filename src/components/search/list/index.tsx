import InfiniteScrollComponent from '@/components/@base/infinite-list-loader';
import ProductCard from '@/components/search/product-card';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

function SearchList({
    data,
    isSuccess,
    limit,
    fetchNextPage,
    isFetchingNextPage,
}) {
    return (
        <div className='h-[88vh]'>
            <InfiniteScrollComponent
                data={data}
                isSuccess={isSuccess}
                hasNextPage={true}
                fetchNextPage={fetchNextPage}
                limit={limit}
                isFetchingNextPage={isFetchingNextPage}
                RenderItem={ProductCard}
            />
        </div>
    );
}
export default memo(SearchList);
