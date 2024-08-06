import { Route, Routes, useRoutes } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

import routes from './routes';
import SidebarMenu from './Components/SidebarMenu';
import Modald from './Components/Modals/Modal';

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <SidebarMenu />
      <section className="flex flex-col grow">
        <Header />
        <main className="px-5 py-2.5">{router}</main>
        <Modald />
      </section>
    </>
  );
}

export default App;
