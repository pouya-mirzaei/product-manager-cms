import React from 'react';
import UseSVG from './UseSVG';
import { Input } from 'antd';
const { Search } = Input;

export default function Header() {
  const onSearch = (value, e, info) => {
    console.log(value);
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between py-4 px-10 border-b border-[#C8CBD9]">
      {/* search box */}
      <div className="basis-3/5 relative">
        <Search
          placeholder="Search"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%',
          }}
        />
      </div>
      {/* user profile */}
      <div className="flex items-center justify-around basis-64  h-8 py-5">
        <div className="flex items-center justify-between gap-x-3 cursor-pointer group hover:bg-slate-100 hover:shadow-md hover:shadow-black/20 transition-all px-2.5 py-1.5 rounded-xl">
          <div className="">
            <span className="w-6 h-6 text-slate-400">
              <UseSVG path="user-circle" />
            </span>
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-sm">pouya mirzaei</span>
            <span className="text-xs">role </span>
          </div>
        </div>

        <div className="h-6">
          <span className="w-6 h-6 inline-block cursor-pointer text-[#B0C3CC] hover:text-secondary-300 transition-all">
            <UseSVG path="bell" />
          </span>
        </div>
      </div>
    </header>
  );
}
