import React from 'react';

const ErrorMessage = ({
    children
}) => {
    return (
        <small className={"error mt-0.5 text-xs lg:text-sm font-[500] text-red-600 absolute"}>
            {children}
        </small>
    )
}

export default ErrorMessage
