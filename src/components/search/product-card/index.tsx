import NextImage from '@/components/NextImage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillShop } from 'react-icons/ai';
import { AiTwotoneStar } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

export default function ProductCard(data, index) {
    const router = useRouter();
    const handleRedirect = () => {
        router.push(`/product/${data[index]?.id}`, undefined, {
            shallow: true,
        });
        sessionStorage.setItem(
            'searchScroll',
            document.querySelector('.List')?.scrollTop.toString() ?? '1'
        );
    };
    return (
        <div className='w-full p-4' onClick={handleRedirect}>
            <div className='relative h-60 w-full'>
                <NextImage
                    src={data[index]?.photo?.SMALL}
                    priority
                    fill
                    className='relative h-60 w-full'
                    alt={data[index]?.name}
                    sizes='(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        33vw'
                />
            </div>
            <div className='h-20 w-full'>{data[index]?.name}</div>
            <div className='flex w-full items-center text-ml text-gray-300'>
                <AiFillShop className='ml-1 text-gray-400' />{' '}
                {data[index]?.vendor?.owner?.city}|{data[index]?.vendor?.name}
            </div>
            <div className='flex w-full items-center text-ml text-gray-300'>
                <AiTwotoneStar className='ml-1 text-gray-400' />{' '}
                {data[index]?.rating?.average} ({data[index]?.rating?.count}
                نظر)
            </div>
            <div className='flex  h-15 w-full items-center justify-between'>
                <div className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm bg-orange-500 transition-colors hover:bg-orange-800'>
                    <BsPlusLg color='white' />
                </div>
                <div className='flex h-full  items-end justify-end  text-lg font-bold text-gray-800'>
                    {data[index]?.price?.toLocaleString()} تومان
                </div>
            </div>
        </div>
    );
}
