import React, { useState, useEffect, TimeHTMLAttributes } from 'react';

const InputDebounce = (props) => {
    const { onChange, ...otherProps } = props;

    const [inputTimeout, setInputTimeout] = useState<any>(null);

    useEffect(() => () => clearTimeout(inputTimeout), [inputTimeout]);

    const inputOnChange = (value) => {
        if (inputTimeout) clearTimeout(inputTimeout);
        setInputTimeout(
            setTimeout(() => {
                if (onChange) onChange(value);
            }, 500)
        );
    };

    return (
        <input
            {...otherProps}
            onChange={(e) => inputOnChange(e.target.value)}
        />
    );
};

export default InputDebounce;
