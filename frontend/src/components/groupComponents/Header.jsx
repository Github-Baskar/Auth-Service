import { useState } from 'react';
import { Drawer as AntDrawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { useSignOutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { MenuIcon } from '../../icons';
import Button from '../baseComponents/Button';
import NavMenuList from './NavMenuList';
import ProfileLogo from '../baseComponents/ProfileLogo';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const [signOut, { isLoading }] = useSignOutMutation();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const signout = async () => {
        try {
            await signOut().unwrap();
            dispatch(logout());
            googleLogout();
            toast.success('Signed out successfully. See you next time!');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <nav className='header-wrapper flex justify-center items-center bg-gray sticky top-0 z-[100] h-[80px] shadow-md'>
            <div className="header-content flex justify-between items-center w-[100%] md:w-[80%] lg:w-[75%] xl:w-[65%] p-4 md:p-0">
                <h1 className='text-[0.8rem] sm:text-[1rem] lg:text-[1.5rem] uppercase tracking-[3px] font-[800]'>Auth Service</h1>
                <div className="hidden md:block">
                    <NavMenuList
                        isLoading={isLoading}
                        userInfo={userInfo}
                        signout={signout}
                    />
                </div>
                <button
                    className={'btn md:hidden bg-transparent border-0 p-0'}
                    onClick={showDrawer}
                >
                    <MenuIcon />
                </button>
                <AntDrawer
                    title={
                        <h1 className='text-[1rem] uppercase tracking-[3px] font-[800] my-3'>Auth Service</h1>
                    }
                    placement={'right'}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={'right'}
                    className={'md:hidden'}
                    width={300}
                    footer={
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <ProfileLogo
                                    imageURL={userInfo?.dp || null}
                                    name={userInfo?.name || 'Guest User'}
                                />
                                <div className="ms-2">
                                    <p className='font-semibold text-[#333] text-[1rem] tracking-[1px]'>{userInfo?.name ? userInfo.name : 'Guest User'}</p>
                                </div>
                            </div>
                            {
                                userInfo?.name ?
                                    <Button
                                        type={'button'}
                                        className='btn bg-[#03A9F4] text-[#fff] text-[0.8rem] uppercase font-semibold px-3 py-1 w-fit hover:bg-[#fff] hover:text-[#03A9F4] hover:border-[#03A9F4]'
                                        loading={isLoading}
                                        onClick={() => {
                                            signout();
                                            onClose()
                                        }}
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
                    }
                >
                    <NavMenuList
                        userInfo={userInfo}
                        onClick={onClose}
                    />
                </AntDrawer>
            </div>
        </nav>
    )
}

export default Header
