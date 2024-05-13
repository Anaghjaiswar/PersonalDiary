import {Routes, Route} from 'react-router-dom';

import Sign from './_Auth/forms/Sign';
import Register from './_Auth/forms/register';
import AuthLayout from './_Auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import {Home, Page} from './_root/Pages';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route index element={<Sign/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Route>
      
        {/* private routes */}
        <Route element={<RootLayout/>}>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/page" element={<Page/>}></Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App