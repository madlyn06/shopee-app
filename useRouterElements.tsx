import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './src/pages/ProductList'
import RegisterLayout from './src/layouts/RegisterLayout'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import MainLayout from 'src/layouts/MainLayout'
import Profile from 'src/pages/Profile'
import { AppContext } from 'src/context/app.context'
import ProductDetail from 'src/pages/ProductDetail'
import Cart from 'src/pages/Cart'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/ChangePassword'
import NotFound from 'src/pages/NotFound/NotFound'
const useRouterElements = () => {
  const { isAuthenticated } = useContext(AppContext)
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
  }
  const elements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'user',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'password',
              element: <ChangePassword />
            }
          ]
        },
        {
          path: 'cart',
          index: true,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/:id',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return elements
}

export default useRouterElements
