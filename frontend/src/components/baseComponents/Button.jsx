import React from 'react'
import { Button as AntButton } from 'antd';

const Button = ({
    type,
    children,
    className,
    shape,
    loading,
    disabled,
    icon,
    iconPosition = 'start',
    onClick = () => null
}) => {
    return (
        <>
            {
                type === 'submit' ?
                    <AntButton
                        htmlType='submit'
                        className={`font-semibold w-fit ${type === 'link' ? 'rounded-none' : 'rounded-[4px]'} ${className}`}
                        shape={shape}
                        loading={loading}
                        disabled={disabled}
                        icon={icon}
                        iconPosition={iconPosition}
                        onClick={onClick}
                    >
                        {children}
                    </AntButton> :
                    <AntButton
                        type={type}
                        className={`font-semibold w-fit ${type === 'link' ? 'rounded-none' : 'rounded-[4px]'} ${className}`}
                        shape={shape}
                        loading={loading}
                        disabled={disabled}
                        icon={icon}
                        iconPosition={iconPosition}
                        onClick={onClick}
                    >
                        {children}
                    </AntButton>
            }
        </>
    )
}

export default Button