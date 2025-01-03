import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AIGeneratedPage from '../pages/AIGeneratedPage/index'; 
import Login from '../pages/AuthPages/LoginPage';
import Signup from '../pages/AuthPages/SignUpPage';

const route = createBrowserRouter([
  {
    path: '/',
    element: <AIGeneratedPage />,
  },
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
]);

const Router = () => {
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default Router;
