import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddProperty from './pages/AddProperty';
import CardDetails from './pages/CardDetails';
import ExpensesPage from './pages/ExpensesPage';
import IncomePage from './pages/IncomesPage';
import ImageUploadPage from './pages/ImageUploadPage';





// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'property', element: <AddProperty /> },
        { path: 'expenses', element: <ExpensesPage /> },
        { path: 'incomes', element: <IncomePage /> },
        { path: 'upload', element: <ImageUploadPage /> },
        { path: '/dashboard/card-details/:propertyId', element: <CardDetails /> },
     

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
