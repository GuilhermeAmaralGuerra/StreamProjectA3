import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './login.jsx'
import Signup from './signup.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
