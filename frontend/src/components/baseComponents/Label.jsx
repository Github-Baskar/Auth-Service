import React from 'react';

const Label = ({
    name,
    children,
    isRequired
}) => {
    return (
        <label
            htmlFor={name}
            className="absolute z-[1] -top-2 left-2 inline-block bg-[#fff] px-1 text-xs font-semibold text-gray-900"
        >
            {children} {isRequired && <span className='text-red-600'>*</span>}
        </label>
    )
}

export default Label
