import {
  CommentOutlined,
  DollarOutlined,
  HomeOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'sub1',
    type: 'group',
    label: 'Menu',
    icon: <SettingOutlined />,
    children: [
      { key: '1', label: 'Home page', slag: '/', icon: <HomeOutlined /> },
      { key: '2', label: 'Products', slag: 'products', icon: <ProductOutlined /> },
      { key: '3', label: 'Comments', slag: 'comments', icon: <CommentOutlined /> },
      { key: '4', label: 'Users', slag: 'users', icon: <UsergroupAddOutlined /> },
      { key: '5', label: 'Orders', slag: 'orders', icon: <ShoppingCartOutlined /> },
      { key: '6', label: 'Offs', slag: 'offs', icon: <DollarOutlined /> },
    ],
  },
];
const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const label = location.pathname.split('/')[1];
  const itemSelected =
    items[0].children.find((item) => item.slag.toLowerCase() == label.toLowerCase())?.key || '1';

  const onClick = (e) => {
    navigate(items[0].children.find((item) => e.key == item.key).slag);
  };
  return (
    <section className="basis-60 min-h-screen">
      <a href="/">
        <div className="h-16 border-b border-[#C8CBD9]">
          <h1 className="h-full text-primary-200 flex items-center justify-center gap-x-2 cursor-pointer">
            <span className="font-bold w-6 h-6 bg-primary-200 rounded-full text-white text-center">
              G
            </span>
            {/* name */}
            <span className="font-bold">GOODFOOD</span>
          </h1>
        </div>
      </a>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          height: '100%',
        }}
        defaultSelectedKeys={[itemSelected]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </section>
  );
};
export default SidebarMenu;
