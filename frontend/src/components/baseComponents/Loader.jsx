import { Bars } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div
            className={`relative w-[100vw] min-h-[100dvh] flex justify-center items-center`}
            role="status"
        >
            <Bars
                height="50"
                width="50"
                color={"#03A9F4"}
                ariaLabel="bars-loading"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader