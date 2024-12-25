import { useSelector } from 'react-redux';

const HomePage = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return (
        <div className='home-page relative flex flex-col justify-center items-center w-[100vw] sm:w-[80%] lg:w-[75%] xl:w-[65%] min-h-[calc(100vh-80px)] p-4 lg:p-0 mx-auto'>
            {
                userInfo?.name ?
                    <>
                        <p className='text-[1.25rem] sm:text-[2rem] lg:text-[2.5rem] font-semibold text-center'>Welcome back, {userInfo?.name}</p>
                        <p className='text-[0.8rem] sm:text-[1rem] lg:text-[1.15rem] font-medium text-center mt-4'>You can now access the user list and enjoy all the features of our app.</p>
                    </> :
                    <>
                        <p className='text-[1.25rem] sm:text-[2rem] lg:text-[2.5rem] font-semibold text-center'>Welcome to our MERN Stack Auth Service!</p>
                        <p className='text-[0.8rem] sm:text-[1rem] lg:text-[1.15rem] font-medium text-center mt-4'>This app supports email/password authentication and Google OAuth. Authenticated users can access the user list, while guests see only the home page.</p>
                    </>
            }
        </div>
    )
}

export default HomePage