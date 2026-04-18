import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'


function MainLayouts() {
    const [open, setOpen] = useState(false);
  return (
     <div className="flex ">
        <div className='md:mr-20'>
             <Sidebar open={open} setOpen={setOpen} />
        </div>

    <div className="flex-1 flex flex-col">
        <Header setOpen={setOpen} />

        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayouts