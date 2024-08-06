import React, { useState } from 'react';
import UseSVG from './UseSVG';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { id: 0, title: 'Home page', slag: '/', icon: 'home' },
    { id: 1, title: 'Products', slag: 'products', icon: 'products' },
    { id: 2, title: 'Comments', slag: 'comments', icon: 'comment' },
    { id: 3, title: 'Users', slag: 'users', icon: 'users' },
    { id: 4, title: 'Orders', slag: 'orders', icon: 'orders' },
    { id: 5, title: 'Offs', slag: 'offs', icon: 'off' },
  ];

  return (
    <section className="basis-60 bg-bg-300 min-h-screen">
      {/* logo and brand name */}
      <div className="h-16 border-b border-[#C8CBD9]">
        <h1 className="h-full text-primary-200 flex items-center justify-center gap-x-2 cursor-pointer">
          <span className="font-bold w-6 h-6 bg-primary-200 rounded-full text-white text-center">G</span>
          {/* name */}
          <span className="font-bold">GOODFOOD</span>
        </h1>
      </div>

      {/* menu */}
      <div className="px-5 py-11 flex items-start justify-center flex-col gap-y-5">
        <span className="text-black/50 text-xs">MENU</span>

        <nav className="w-full">
          <ul className="sidebar">
            {menuItems.map((item) => (
              <li className={activeItem == item.id ? 'active' : ''} key={item.id} onClick={() => setActiveItem(item.id)}>
                <Link to={item.slag.toLowerCase()}>
                  <span className="icon">
                    <UseSVG path={item.icon} />
                  </span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Sidebar;
