import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginProvider } from './components/provider'
import './scss/main.scss';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginProvider}/>
       </Switch>
    </BrowserRouter>
  );
}

export default App;
