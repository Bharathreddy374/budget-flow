import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import History from './pages/Dashboard/History';
import UserProvider from './context/UserContext';
import {BrowserRouter as Router,Routes,Route,Navigate,} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Root=()=>{
  const isAuthenticated =!!localStorage.getItem("token");

  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  );
};


const App = () => {
  return (
      <UserProvider>
            <div>

      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<SignUp/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/Expense" exact element={<Expense/>}/>
          <Route path="/income" exact element={<Income/>}/>
          <Route path="/history" exact element={<History/>}/>
        </Routes>
      </Router>
          </div>
      <Toaster
        toastOptions={{
          className: '',
          style:{
            fontSize:'14px',
          },
        }}
        />
      </UserProvider>

  );
};

export default App;
