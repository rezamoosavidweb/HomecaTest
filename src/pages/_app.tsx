import localFont from '@next/font/local';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const homeca = localFont({
    src: '../../public/fonts/IRANSanse/IRANSansWeb(FaNum).woff2',
});

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <main className={homeca.className}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </main>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                    ></ReactQueryDevtools>
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
