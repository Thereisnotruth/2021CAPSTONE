import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeProvider, LoginProvider , SignupProvider ,GroupProvider ,GrouplistProvider /* , ShopProvider*/ } from './components/provider'
import './scss/main.scss';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomeProvider}/>
        <Route path='/login' component={LoginProvider}/>
        <Route path='/signup' component={SignupProvider}/>
        <Route path="/grouplist" component={GrouplistProvider}/>
        <Route path='/group' component={GroupProvider}/>
{/*     <Route path='/shop' component={ShopProvider}/>*/}
       </Switch>
    </BrowserRouter>
  );
}

export default App;
