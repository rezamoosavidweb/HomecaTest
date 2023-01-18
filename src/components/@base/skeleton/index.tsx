import React, { ReactNode } from 'react';
interface Props {
    children: ReactNode;
    className?: string;
}

export default function Skeleton({ children, className }: Props) {
    return (
        <div
            className={`flex h-fit animate-pulse flex-row items-center justify-center ${className}`}
        >
            {children}
        </div>
    );
}
