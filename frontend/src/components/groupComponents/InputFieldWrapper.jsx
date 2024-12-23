import Label from '../baseComponents/Label';
import InputField from '../baseComponents/InputField';
import ErrorMessage from '../baseComponents/ErrorMessage';
import PasswordField from '../baseComponents/PasswordField';

const InputFieldWrapper = ({
    fieldProps,
    // react-hook-form props
    register,
    trigger,
    errors,
}) => {
    const {
        type,
        name,
        label,
        placeholder,
        className = '',
        inputWrapperClassName = '',
        inputClassName = '',
        autoComplete = 'off',
        isRequired,
    } = fieldProps
    const renderField = () => {
        switch (type) {
            case 'password':
                return (
                    <PasswordField
                        type={type}
                        name={name}
                        inputClassName={inputClassName}
                        placeholder={placeholder}
                        trigger={trigger}
                        autoComplete={autoComplete}
                        register={register}
                        {...fieldProps}
                    />
                )
            default:
                return (
                    <InputField
                        type={type}
                        name={name}
                        inputClassName={inputClassName}
                        placeholder={placeholder}
                        trigger={trigger}
                        autoComplete={autoComplete}
                        register={register}
                        {...fieldProps}
                    />
                )
        }
    }
    return (
        <div className={`${className}`} >
            <div className={`relative ${inputWrapperClassName}`}>
                <Label
                    name={name}
                    isRequired={isRequired}
                >
                    {label}
                </Label>
                {renderField()}
            </div>
            {
                errors?.[name]?.message && <ErrorMessage>{errors[name].message}</ErrorMessage>
            }
        </div>
    )
}

export default InputFieldWrapper
