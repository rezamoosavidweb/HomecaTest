import React, { FC } from 'react';
interface Props {
    id?: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string | number;
    className?: string;
    required?: boolean;
    maxLength?: number;
    disabled?: boolean;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: FC<Props> = ({
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    className,
    required,
    maxLength,
    disabled,
}) => {
    return (
        <div>
            <input
                className={`mt-2 rounded-base border border-gray-100 placeholder:text-gray-200 ${className}`}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                maxLength={maxLength}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;
