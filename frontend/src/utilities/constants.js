import * as yup from 'yup';

export const menuList = [
    {
        path: 'home',
        name: 'Home',
        authRoute: false
    },
    {
        path: 'user-list',
        name: 'User list',
        authRoute: true
    },
]

export const signInForm = {
    initialValues: {
        email: '',
        password: '',
    },
    fields: [
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            className: 'mb-8',
            isRequired: true,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            className: 'mb-8',
            isRequired: true,
        },
    ],
    validationSchema: {
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string().required('Password is required.'),
    }
}

export const signUpForm = {
    initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    fields: [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Enter your name',
            className: 'mb-8',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            className: 'mb-8',
            isRequired: true,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            className: 'mb-8',
            isRequired: true,
        },
        {
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm Password',
            placeholder: 'Enter your confirm password',
            className: 'mb-8',
            isRequired: true,
        },
    ],
    validationSchema: {
        name: yup.string().required('Name is required.'),
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters long'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required.').min(6, 'Password must be at least 6 characters long'),
    }
}