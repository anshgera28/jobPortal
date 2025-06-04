

import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Auth/login'
import Signup from './components/Auth/Signup'
import Home from './components/Home'
import { RouterProvider } from 'react-router-dom'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,

  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },

]);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
