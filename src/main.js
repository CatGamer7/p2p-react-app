import OfferList from './lists/offer/offerList';
import OfferDetailWrapper from './details/offer/offerDetailWrapper'
import OfferForm from './forms/offer/offerForm';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<OfferList/>}></Route>
            <Route path='/offer' element={<OfferList/>}></Route>
            <Route path='/offer/:id' element={<OfferDetailWrapper/>}></Route>
            <Route path='/offer/edit' element={<OfferForm/>}></Route>
        </Routes>
    );
}

export default Main;