import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Provider} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


import Login from './components/Login';
import UserContext from './context/UserContext';
import UserElements from './elements/UserElements';
import UserDashBoard from './pages/UserDashBoard';
import AdminElements from './elements/AdminElements';
import AdminDashBoard from './pages/AdminDashBoard';
import Contact from './components/Contact'

import {store} from './store/store'
import Services from './components/Services';
import ChangePasswordDialogue from './util/ChangePasswordDialogue';
import ForgotPassword from './util/ForgotPassword';
import PasswordValidation from './util/PasswordValidation';
import { useState } from 'react';
import HrElements from './elements/HrElements';
import HrDashBoard from './pages/HrDashBoard';
import PageNotFound from './components/PageNotFound';

function App() {

  let [isValidPassword, setIsValidPassword] = useState(false);

  const handleValidPassword = (val) => {
    setIsValidPassword(val);
  }

  return (
    
    <BrowserRouter>
      {/* <Login /> */}
     <Provider store={store}>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/user' element={<UserElements><UserDashBoard /></UserElements>} />
        <Route path='/admin/*' element={<AdminElements><AdminDashBoard /> </AdminElements>}/>
        <Route path='/hr/*' element={<HrElements><HrDashBoard /> </HrElements>}/>
        <Route path="*" element={<PageNotFound />}/>
        {/* </Route> */}
      </Routes>
      <ChangePasswordDialogue />
      {/* <AdminDashBoard /> */}
      </Provider>
    </BrowserRouter>
// {/* <PasswordValidation /> */}
    
  );
}

export default App;
