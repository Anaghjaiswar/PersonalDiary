import React from 'react'
import {Routes, Route} from 'react-router-dom';

import SignIn from './_Auth/forms/signIn';
import SignUp from './_Auth/forms/signUp';
import AuthLayout from './_Auth/authLayout';
import RootLayout from './_root/RootLayout';
// import {Home, page} from '@/_root/Pages';
import Home from './_root/Pages/Home';
import page from './_root/Pages/page';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signIn" element={SignIn}></Route>
          <Route path="/signUp" element={SignUp}></Route>
        </Route>
      

        {/* private routes */}
        <Route element={<RootLayout/>}>
          <Route index element={Home}></Route>
          <Route path="/page" element={page}></Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App