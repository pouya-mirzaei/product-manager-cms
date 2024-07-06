import Comments from './Pages/Comments';
import Offs from './Pages/Offs';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import Users from './Pages/Users';

const routes = [
  { path: '/products', element: <Products /> },
  { path: '/orders', element: <Orders /> },
  { path: '/comments', element: <Comments /> },
  { path: '/users', element: <Users /> },
  { path: '/offs', element: <Offs /> },
];

export default routes;
