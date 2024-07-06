import { Route, Routes, useRoutes } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

import routes from './routes';

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Sidebar />
      <section className="flex flex-col grow">
        <Header />
        <main>{router}</main>
      </section>
    </>
  );
}

export default App;
