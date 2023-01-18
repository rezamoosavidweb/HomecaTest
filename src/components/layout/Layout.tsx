import * as React from 'react';

import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    // Put Header or Footer Here
    return (
        <div className='m-0 flex flex-col p-0 '>
            <Header />
            {children}
        </div>
    );
}
