import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { HomeProvider, LoginProvider , SignupProvider ,GroupProvider ,GrouplistProvider, GroupMakeProvider /* , ShopProvider*/ } from './components/provider'
import { GroupModel, LoginModel, SignupModel, UserModel} from './components/model'
import { ViewModel} from './components/viewmodel'
import './scss/main.scss';

import useStore from './components/useStore';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-CSRFToken';
axios.defaults.withCredentials = true

function App() {
  const { Auth } = useStore();
  Auth.init();
  const Gmodel = new GroupModel();
  const Lmodel = new LoginModel();
  const Smodel = new SignupModel();
  const Umodel = new UserModel();
  const [viewModel] = useState(new ViewModel(Gmodel,Lmodel,Smodel,Umodel));
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' viewModel={viewModel} component={HomeProvider}/>
        <Route path='/login' viewModel={viewModel} component={LoginProvider}/>
        <Route path='/signup' viewModel={viewModel} component={SignupProvider}/>
        <Route path='/GroupMake' viewModel={viewModel} component={GroupMakeProvider}/>
        <Route path="/grouplist" viewModel={viewModel} component={GrouplistProvider}/>
        <Route path='/group' viewModel={viewModel} component={GroupProvider}/>
{/*     <Route path='/shop' component={ShopProvider}/>*/}
       </Switch>
    </BrowserRouter>
  );
}

export default App;

