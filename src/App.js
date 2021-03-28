import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/index'
import UserProvider from './context/user'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
