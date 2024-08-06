import Comments from './Pages/Comments';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Offs from './Pages/Offs';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import Users from './Pages/Users';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/orders', element: <Orders /> },
  { path: '/comments', element: <Comments /> },
  { path: '/users', element: <Users /> },
  { path: '/offs', element: <Offs /> },
  { path: '/*', element: <NotFound /> },
];

export default routes;
