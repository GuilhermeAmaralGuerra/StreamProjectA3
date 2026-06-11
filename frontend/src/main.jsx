import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import AppLayout from './AppLayout.jsx'
import Login from './login/login.jsx'
import Signup from './signup/signup.jsx'
import Dashboard from './dashboard/dashboard.jsx'
import Home from './dashboard/home/home.jsx'
import Explorar from './dashboard/explorar/explorar.jsx'
import Favoritos from './dashboard/favoritos/favoritos.jsx'
import VerMaisTarde from './dashboard/ver-mais-tarde/ver-mais-tarde.jsx'
import Configuracoes from './dashboard/configuracoes/configuracoes.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          { index: true, element: <Home /> },
          { path: 'explorar', element: <Explorar /> },
          { path: 'favoritos', element: <Favoritos /> },
          { path: 'ver-mais-tarde', element: <VerMaisTarde /> },
          { path: 'configuracoes', element: <Configuracoes /> }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
