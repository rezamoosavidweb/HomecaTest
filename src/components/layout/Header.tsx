import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';

import Drawer from '@/components/@base/drawer';
import NextImage from '@/components/NextImage';

import { useQuery, useQueryClient } from 'react-query';
import InputDebounce from '@/components/@base/input/InputDebounce';
import axios, { AxiosResponse } from 'axios';
import { AiOutlineFire } from 'react-icons/ai';

interface Product {
    desc: string;
    key: string;
    value: string;
}
interface SearchResult {
    response: Array<Product>;
}

export default function Header() {
    // **Hooks
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, refetch, isSuccess, isLoading, isIdle } = useQuery<
        AxiosResponse<SearchResult>,
        Error
    >(
        ['search'],
        ({ signal }) =>
            axios.get(
                `https://search.basalam.com/ai-engine/api/v3.0/ac?q=${searchTerm}`,
                {
                    signal,
                }
            ),

        {
            enabled: false,
            keepPreviousData: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            retryOnMount: false,
        }
    );

    //**handlers
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const onOpenDrawer = () => {
        setOpenDrawer(true);
    };
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    //**remove query from catch when exit from search
    const handleResetSearchQuery = () => {
        setSearchTerm('');
        queryClient.resetQueries({
            queryKey: ['search'],
        });
    };

    //**get data from search params if search length exist else reset query
    useEffect(() => {
        if (!!searchTerm?.length) {
            //** cancel previous request that is pending for response
            queryClient.cancelQueries('search');
            refetch();
        } else {
            handleResetSearchQuery();
        }
    }, [searchTerm]);

    return (
        <header className='sticky top-0 z-1000   border-b border-solid border-b-neutral-300 bg-white'>
            <div className='pb-5 shadow-base'>
                <div className='w-full'>
                    <div className='flex items-center justify-between py-6 px-4 pb-6 md:mx-6 md:px-0 md:pb-0'>
                        <div className='cursor-pointer pl-8 md:hidden'>
                            <FiMenu
                                size='1.5rem'
                                color='#33313c'
                                onClick={onOpenDrawer}
                            />
                        </div>
                        <div className='mr-4 flex flex-1'>
                            <div className='relative w-20 min-w-[80px]'>
                                <NextImage
                                    useSkeleton
                                    src='/images/logo.svg'
                                    fill
                                    alt='Icon'
                                    className=' h-8 cursor-pointer'
                                    priority
                                    sizes='(max-width: 768px) 100px,
                                (max-width: 1200px) 50px,
                                33vw'
                                />
                            </div>
                            <div
                                className={`relative z-1002 mr-8 hidden h-12 w-full min-w-[236px] max-w-md items-center   ${
                                    !isIdle
                                        ? 'rounded-[10px] rounded-b-none bg-white'
                                        : 'rounded-[10px] border bg-gray-50'
                                } px-3 text-sm text-gray-300 md:flex `}
                            >
                                <FiSearch size='1.5rem' color='#606060' />
                                <InputDebounce
                                    type='text'
                                    placeholder='جستجو بازار'
                                    onChange={(data) => setSearchTerm(data)}
                                    className=' h-full w-full border-none bg-transparent pl-3 text-ml text-dark  focus:ring-0'
                                />
                                {!isIdle && (
                                    <div className='absolute left-0 top-10 min-h-[100px] w-full rounded-[10px] rounded-t-none bg-white'>
                                        {data?.data?.response?.map((item) => (
                                            <Link
                                                href={`/search?q=${searchTerm}&type=products`}
                                                shallow
                                                scroll={false}
                                            >
                                                <div
                                                    className='flex w-full cursor-pointer items-center border-b p-3 text-base hover:bg-gray-50'
                                                    key={item?.value}
                                                    onClick={
                                                        handleResetSearchQuery
                                                    }
                                                >
                                                    <AiOutlineFire className='ml-1' />
                                                    {item?.value}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {!isIdle && (
                                <div
                                    onClick={handleResetSearchQuery}
                                    className='fixed top-0 left-0 z-1001 h-screen w-screen bg-gray-800 opacity-50'
                                ></div>
                            )}
                        </div>
                        <div className='flex items-center gap-6'>
                            <div className='cursor-pointer items-center md:flex md:rounded-[10px] md:border md:border-gray-100 md:p-2 md:text-gray-400'>
                                <FiUser size='1.5rem' />
                                <span className='hidden md:block'>
                                    ورود/ ثبت نام
                                </span>
                            </div>
                            <div className='hidden cursor-pointer md:flex md:rounded-[10px] md:border md:border-gray-100  md:p-2 md:text-gray-400'>
                                <FiBell size='1.5rem' />
                            </div>
                            <div className='cursor-pointer md:flex md:rounded-[10px] md:border md:border-gray-100  md:p-2 md:text-gray-400'>
                                <FiShoppingCart size='1.5rem' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer open={openDrawer} onClose={onCloseDrawer}>
                <div className='bg-red-500'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
            </Drawer>
        </header>
    );
}
