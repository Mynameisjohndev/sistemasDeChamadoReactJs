import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes/index'
import UserProvider from './context/user'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2500} />
        <Routes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
