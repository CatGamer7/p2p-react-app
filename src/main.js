import OfferList from './lists/offer/offerList';
import OfferDetailWrapper from './details/offer/offerDetailWrapper'
import OfferForm from './forms/offer/offerForm';

import RequestList from './lists/requests/requestList';
import RequestDetailWrapper from './details/request/requestDetailWrapper';
import RequestForm from './forms/request/requestForm';

import UserList from './lists/user/userList';
import UserDetailWrapper from './details/user/userDetailWrapper';
import UserForm from './forms/user/userForm';

import NotFound from './utils/notFound';
import NoConnection from './utils/noConnection';

import LoginForm from './auth/login';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<OfferList/>}></Route>
            <Route path='login' element={<LoginForm/>}></Route>

            <Route path='/offer' element={<OfferList/>}></Route>
            <Route reloadDocument path='/offer/:id' element={<OfferDetailWrapper/>}></Route>
            <Route reloadDocument path='/offer/edit' element={<OfferForm/>}></Route>
            
            <Route path='/request' element={<RequestList/>}></Route>
            <Route reloadDocument path='/request/:id' element={<RequestDetailWrapper/>}></Route>
            <Route reloadDocument path='/request/edit' element={<RequestForm/>}></Route>

            <Route path='/user' element={<UserList/>}></Route>
            <Route reloadDocument path='/user/:id' element={<UserDetailWrapper/>}></Route>
            <Route reloadDocument path='/user/edit' element={<UserForm/>}></Route>
            
            <Route path='/no-connection' element={<NoConnection/>} />
            <Route path='/not-found' element={<NotFound/>} />
            <Route path='/*' element={<NotFound/>} />
        </Routes>
    );
}

export default Main;