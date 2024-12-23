import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider as AntDivider } from 'antd';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { signInForm } from '../../utilities';
import { useSignInMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { GoogleIcon } from '../../icons';
import Button from '../baseComponents/Button';
import InputFieldWrapper from '../groupComponents/InputFieldWrapper';

const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const { initialValues, fields, validationSchema } = signInForm
    const [signIn, { isLoading }] = useSignInMutation();

    const schema = yup.object().shape({ ...validationSchema })
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    })
    const submitHandler = async (data) => {
        const { email, password } = data
        try {
            const res = await signIn({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            reset(initialValues);
            toast.success('Signed in successfully! Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const signin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        if (user) {
            console.log(user, "user")
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    console.log(res.data, "user response");
                    const authUser = async (data) => {
                        try {
                            const { email, picture } = data
                            const res = await signIn({ email }).unwrap();
                            dispatch(setCredentials({ ...res, dp: picture }));
                            toast.success('Signed in successfully! Welcome back!');
                            navigate('/');
                        } catch (err) {
                            toast.error(err?.data?.message || err.error);
                        }
                    }
                    authUser(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <div className="auth-page-wrapper flex flex-1 flex-col justify-center bg-gray h-[100vh]">
            <div className="bg-white shadow-md rounded-lg sm:mx-auto sm:w-full sm:max-w-[480px] px-4 py-12 sm:px-12">
                <h1 className='text-[0.8rem] sm:text-[1rem] lg:text-[1.5rem] text-center uppercase tracking-[3px] font-[800]'>Auth Service</h1>
                <form
                    className="mt-8"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    {
                        Array.isArray(fields) && fields.length > 0 ? (
                            <>
                                {fields.map((field, index) => {
                                    return (
                                        <InputFieldWrapper
                                            key={index}
                                            fieldProps={field}
                                            trigger={trigger}
                                            register={register}
                                            errors={errors}
                                        />
                                    )
                                })}
                                <Button
                                    type='submit'
                                    className='bg-[#03A9F4] text-[#fff] uppercase hover:!bg-[rgba(3,169,244,0.7)] hover:!text-[#fff] focus-visible:outline-0 border-0 rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full'
                                    loading={isLoading}
                                >
                                    Sign in
                                </Button>
                            </>
                        ) : <p className='leading-6 text-gray-600 text-sm font-medium'>No fields available</p>
                    }
                </form>
                <AntDivider><small>or sign in with</small></AntDivider>
                <Button
                    type='button'
                    className='border border-black rounded-md py-4 lg:py-5 text-sm/6 font-semibold w-full hover:bg-[rgba(0,58,228,.04)]'
                    loading={isLoading}
                    icon={<GoogleIcon />}
                    onClick={signin}
                >
                    Continue with Google
                </Button>

                <p className='text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] text-center mt-4'>Don't have an account?<NavLink to='/sign-up' className={`text-[#03A9F4] ps-1 underline hover:text-[rgba(3,169,244,0.7)]`}>Sign up</NavLink></p>
            </div>
        </div>
    )
}

export default SignInPage