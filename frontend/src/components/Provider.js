import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
    HomeController, LoginController, SignUpController, GroupMakeController, GroupListController, GroupController,
    UserInfoController,
} from './view';
import ViewModel from './ViewModel'; 
import Model from './Model';

const Provider = () => {
    const model = new Model();
    const viewModel = new ViewModel(model);
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={ () => <HomeController viewModel={viewModel} /> } />
                <Route path='/login' render={ () => <LoginController viewModel={viewModel} /> } />
                <Route path='/signup' render={ () => <SignUpController viewModel={viewModel} /> } />
                <Route path='/groupmake' render={ () => <GroupMakeController viewModel={viewModel} /> } />
                <Route path='/grouplist' render={ () => <GroupListController viewModel={viewModel} /> } />
                <Route path='/group' render={ () => <GroupController viewModel={viewModel} /> } />
                <Route path='/info' render={ () => <UserInfoController viewModel={viewModel} /> } />
            </Switch>
        </BrowserRouter>
    )
}

export default Provider;