import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AIGeneratedPage from '../pages/AIGeneratedPage/index'; 
import Login from '../pages/AuthPages/LoginPage';
import Signup from '../pages/AuthPages/SignUpPage';
import AddQuestionPage from '../pages/AddQuestionPage';
import CsvFormPage from '../pages/CsvFormPage';
import ViewQuestionsPage from '../pages/viewQuestionsPage';

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
    element:<ViewQuestionsPage/>
  }
]);

const Router = () => {
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default Router;
