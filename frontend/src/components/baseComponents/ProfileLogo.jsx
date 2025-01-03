import { useState } from 'react';
import { profileName } from 'src/utilities';

const ProfileLogo = (
    {
        imageURL = null,
        name = "Guest User",
    }
) => {
    const [imgError, setImgError] = useState(false);
    return (
        <>
            {
                imageURL && !imgError ?
                    <img
                        className="cursor-pointer rounded-full object-center w-[38px] h-[38px] md:w-[40px] md:h-[40px]"
                        src={imageURL}
                        alt="user"
                        onError={() => setImgError(true)}
                    /> :
                    <div className="profile-picture-name flex justify-center items-center rounded-full cursor-pointer font-medium bg-[#6A5FF3] text-[#fff] text-[16px] md:text-[20px] w-[38px] h-[38px] md:w-[40px] md:h-[40px]">{profileName(name)}</div>
            }
        </>
    );
};

export default ProfileLogo;