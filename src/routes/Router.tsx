import { type FC, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ProviderRoutes } from './paths'
import { useGlobal } from '../hooks/useGlobal'


const Login = lazy(() => import('../pages/login/Login'))
const Orders = lazy(() => import('../pages/orders/Orders'))
const ClientData = lazy(() => import('../pages/clientData/ClientData'))
const Home = lazy(() => import('../pages/home/Home'))
const Profile = lazy(() => import ('../pages/profile/Profile'))
const EditProfile = lazy(() => import ('../pages/editProfile/EditProfile'))


const ProtectedRoute: FC = () => {
  const { providerToken, loading } = useGlobal()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20vh' }}>
        <h3>Loading workspace configuration...</h3>
      </div>
    );
  }
  
  return providerToken ? <Outlet /> : <Navigate to={ProviderRoutes.LOGIN} replace />;
}



const NotFound: FC = () => (
  <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20vh' }}>
    404 - Page not found
  </h1>
);

const Router: FC = () => {
  return (
    // Suspense handles loading fallback transitions while lazy bundles fetch over the network
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '20vh' }}>Loading screen layer...</div>}>
      <Routes>
        {/* 🔓 Public Entry Routes */}
        <Route path={ProviderRoutes.LOGIN} element={<Login />} />

        {/* 🔒 Protected Workspace Routes (Intercepted by Guard) */}
        <Route element={<ProtectedRoute />}>
          <Route path={ProviderRoutes.ORDERS} element={<Orders />} />
          <Route path={ProviderRoutes.CLIENT_DATA} element={<ClientData />} />
          <Route path={ProviderRoutes.HOME} element={<Home />} />
          <Route path={ProviderRoutes.PROFILE} element={<Profile />} />
          <Route path={ProviderRoutes.EDIT_PROFILE} element={<EditProfile />} />
        </Route>

        {/* 🔍 Catch-all Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;