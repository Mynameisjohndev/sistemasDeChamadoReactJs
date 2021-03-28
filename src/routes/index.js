import { Switch } from 'react-router-dom';

import Route from './Route'
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index'

const App = () => {
    return (
      <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route exact path="/register" component={SignUp}/>
          <Route exact path="/dashboard" component={Dashboard} isPrivate/>
      </Switch>
    );
  }
  
  export default App;
  