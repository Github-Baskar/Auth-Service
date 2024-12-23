const InputField = ({
    type,
    name,
    placeholder,
    register,
    autoComplete = 'off',
    trigger,
    inputClassName,
    ...props
}) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            className={`block w-full rounded-md border border-[#333] focus-visible:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#03A9F4] bg-transparent p-2 text-gray-900 shadow-sm placeholder:text-gray-400 text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] ${inputClassName}`}
            placeholder={placeholder}
            onKeyUp={() => trigger(name)}
            autoComplete={autoComplete}
            {...register(name)}
        />
    )
}

export default InputField
