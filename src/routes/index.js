import { Switch } from 'react-router-dom';

import Route from './Route'
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import Profile from '../pages/Profile/index';
import Customers from '../pages/Customers/index';

const App = () => {
    return (
      <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route exact path="/register" component={SignUp}/>
          <Route exact path="/dashboard" component={Dashboard} isPrivate/>
          <Route exact path="/profile" component={Profile} isPrivate/>
          <Route exact path="/customers" component={Customers} isPrivate/>
      </Switch>
    );
  }
  
  export default App;
  