import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from '../userContex'; 
import AIGeneratedPage from '../pages/AIGeneratedPage/index';
import Login from '../pages/AuthPages/LoginPage';
import Signup from '../pages/AuthPages/SignUpPage';
import Dashboard from '../pages/DashboardPage/index';
import ForgotPassword from '../pages/AuthPages/ForgotPasswordPage';
import AddQuestionPage from '../pages/AddQuestionPage';
import CsvFormPage from '../pages/CsvFormPage';
import ViewTopicsPage from '../pages/viewTopicsPage';

// Routes definition
const routes = createBrowserRouter([
  
  {
    path: '/AIGeneratedQuestions',
    element: <AIGeneratedPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element:<Dashboard/>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
  },
  {
    path: '/add-manually',
    element: <AddQuestionPage />,
  },
  {
    path: '/add-csv',
    element: <CsvFormPage />,
  },
  {
    path:'/view-questions',
    element:<ViewTopicsPage/>
  }
]);


const Router = () => {
  return (
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  );
};

export default Router;
