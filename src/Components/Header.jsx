import React from 'react';
import UseSVG from './UseSVG';

export default function Header() {
  return (
    <header className="grow h-16 bg-white flex items-center justify-between py-4 px-10">
      {/* search box */}
      <div className="basis-3/5 relative">
        <input
          type="search"
          id=""
          placeholder="Search"
          className="w-full bg-[#627B87]/10 h-5 py-5 px-4 rounded-md hover:bg-slate-200 focus:bg-slate-300 transition-all"
        />
        <span className="w-5 h-5 inline-block absolute right-2 top-1/2 -translate-y-1/2 text-[#627B87] cursor-pointe outline-none">
          <UseSVG path="search" />
        </span>
      </div>
      {/* user profile */}
      <div className="flex items-center justify-around basis-64  h-8 py-5">
        <div className="group flex items-center justify-between gap-x-3 cursor-pointer group">
          <div className="h-9 w-9 flex items-center justify-center bg-[#FFE6CC] group-hover:bg-primary-100/30 transition-all rounded-full">
            <span className="w-6 h-6 text-slate-400">
              <UseSVG path="user-circle" />
            </span>
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="font-semibold text-sm">pouya mirzaei</span>
            <span className="font-semibold text-xs">role </span>
          </div>
        </div>

        <div className="h-6">
          <span className="w-6 h-6 inline-block cursor-pointer text-[#B0C3CC] hover:text-secondary-200 transition-all">
            <UseSVG path="bell" />
          </span>
        </div>
      </div>
    </header>
  );
}
