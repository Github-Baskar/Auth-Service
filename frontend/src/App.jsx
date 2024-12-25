import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './components/pageComponents/HomePage';
import ErrorPage from './components/pageComponents/ErrorPage';
import SignInPage from './components/pageComponents/SignInPage';
import SignUpPage from './components/pageComponents/SignUpPage';
import MasterLayout from './MasterLayout';
import PrivateRoute from './PrivateRoute';
import UserListPage from './components/pageComponents/UserListPage';
import Loader from './components/baseComponents/Loader';

function App() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path='/sign-in' element={<SignInPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='/' element={<MasterLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path='/home' element={<Navigate to='/' />} />
                        <Route element={<PrivateRoute />}>
                            <Route path='/user-list' element={<UserListPage />} />
                        </Route>
                        <Route path='*' element={<Navigate to='/page-404' />} />
                    </Route>
                    <Route path='/page-404' element={<ErrorPage />} />
                </Routes>
                <ToastContainer
                    position="top-center"
                />
            </Suspense>
        </Router>
    )
}

export default App
