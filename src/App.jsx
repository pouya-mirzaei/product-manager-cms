import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Products from './Pages/Products';
import Comments from './Pages/Comments';
import Orders from './Pages/Orders';
import Users from './Pages/Users';
import Offs from './Pages/Offs';

function App() {
  return (
    <>
      <Sidebar />
      <section className="flex flex-col grow">
        <Header />
        <main>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/offs" element={<Offs />} />
          </Routes>
        </main>
      </section>
    </>
  );
}

export default App;
