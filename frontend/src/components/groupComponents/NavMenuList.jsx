import { NavLink, useNavigate } from 'react-router-dom';
import { Popover as AntPopover } from 'antd';

import { menuList } from '../../utilities';
import Button from '../baseComponents/Button';
import ProfileLogo from '../baseComponents/ProfileLogo';

const NavMenuList = ({
    isLoading = false,
    userInfo,
    onClick = () => { },
    signout = () => { },
}) => {
    const navigate = useNavigate();
    return (
        <ul className={`menu-list flex flex-col md:flex-row items-start justify-between md:items-center`}>
            {
                Array.isArray(menuList) &&
                    menuList.length > 0 ? menuList.map((menu, index) => {
                        if (menu.authRoute && !userInfo) {
                            return null
                        }
                        return (
                            <li
                                key={index}
                                className='max-md:w-full font-semibold md:font-medium'
                                onClick={() => {
                                    onClick();
                                }}
                            >
                                <NavLink
                                    to={`/${menu.path === "home" ? "" : menu.path}`}
                                    className={`nav-link flex items-center md:justify-end md:text-[0.9rem] lg:text-[1rem] py-3 md:px-4 md:py-0`}
                                >
                                    {menu.name}
                                </NavLink>
                            </li>
                        )
                    }) : ''
            }
            <li className='hidden md:block ms-4'>
                <AntPopover
                    content={
                        <div className='flex flex-col gap-2 min-w-[225px]'>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Name: <span className='text-[#333]'>{userInfo?.name || 'Guest User'}</span></p>
                            <p className='font-semibold text-[#4b5563] text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] tracking-[1px] ms-[0.4px]'>Mail Id: <span className='text-[#333]'>{userInfo?.email || '--'}</span></p>
                            <div className="text-end">
                                {
                                    userInfo?.name ?
                                        <Button
                                            type={'button'}
                                            className='btn bg-[#03A9F4] text-[#fff] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit hover:bg-[#fff] hover:text-[#03A9F4] hover:border-[#03A9F4]'
                                            loading={isLoading}
                                            onClick={signout}
                                        >
                                            Sign out
                                        </Button> :
                                        <Button
                                            type={'button'}
                                            className='btn bg-[#03A9F4] text-[#fff] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit hover:bg-[#fff] hover:text-[#03A9F4] hover:border-[#03A9F4]'
                                            onClick={() => navigate('/sign-in')}
                                        >
                                            Sign in
                                        </Button>
                                }
                            </div>
                        </div>
                    }
                    placement="bottomRight"
                >
                    <>
                        <ProfileLogo
                            imageURL={userInfo?.dp || null}
                            name={userInfo?.name || 'Guest User'}
                        />
                    </>
                </AntPopover>
            </li>
        </ul>
    )
}

export default NavMenuList
