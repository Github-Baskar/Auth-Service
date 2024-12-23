import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className={`home-page bg-[#f7f9fb] relative flex flex-col justify-center items-center w-[100vw] min-h-[100dvh] p-4 lg:p-0`}>
            <div className="home-content text-center w-[100%] sm:w-[80%] lg:w-[75%] xl:w-[65%] mb-[25px] lg:mb-[75px]">
                <h1 className='text-[2rem] sm:text-[3rem] lg:text-[5rem] uppercase tracking-[3px] font-[800]'>
                    404
                </h1>
                <h1 className='text-[1.5rem] sm:text-[2.5rem] lg:text-[4.5rem] uppercase tracking-[3px] font-[800]'>
                    Page not found
                </h1>
                <p className='text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem]'>
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <button
                    type='button'
                    className={`btn bg-[rgb(3,169,244)] hover:bg-[rgba(3,169,244,0.7)] text-[#fff] text-[0.7rem] sm:text-[0.8rem] lg:text-[1rem] uppercase tracking-[1px] rounded-md px-[0.6rem] py-[0.5rem] sm:px-[1rem] lg:px-[1.5rem] lg:py-[0.8rem] font-[500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-4 sm:mt-6 lg:mt-10`}
                    onClick={() => navigate('/')}
                >
                    Go to home page
                </button>
            </div>
        </div>
    )
}

export default ErrorPage