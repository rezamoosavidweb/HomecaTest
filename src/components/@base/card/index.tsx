import React, { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export const Card: FC<Props> = ({ children, className }) => {
    return (
        <div className={`rounded-base border bg-white px-3 py-4 ${className}`}>
            {children}
        </div>
    );
};
