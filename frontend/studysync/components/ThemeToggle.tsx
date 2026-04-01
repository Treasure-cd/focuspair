"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, CubeIcon } from "@phosphor-icons/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();


  const isDark = theme === "dark";

  return (


    //Toggle button previously used
  //  <label className="relative inline-block w-15 h-8.5">
  //     <input
  //       type="checkbox"
  //       checked={isDark}
  //       onChange={() => setTheme(isDark ? "light" : "dark")}
  //       className="peer opacity-0 w-0 h-0"
  //     />

  //     <span className="
  //       absolute cursor-pointer inset-0 
  //       bg-[#ccc] peer-checked:bg-[#2196F3] 
  //       peer-focus:shadow-[0_0_1px_#2196F3]
  //       transition-all duration-400 rounded-[34px]
  //       before:content-[''] before:absolute before:h-6.5 before:w-6.5 
  //       before:left-1 before:bottom-1 before:bg-white 
  //       before:transition-all before:duration-400 before:rounded-full
  //       peer-checked:before:translate-x-6.5"
  //      />
  //   </label> 

  
    
    <button onClick={() => setTheme(isDark? "light" : "dark")} className='cursor-pointer transition duration-300 ease-in-out'>
      {isDark? 
      <MoonIcon weight="thin" className='w-10 h-10 text-blue-200 hover:text-blue-200/80 ' />: 
        <SunIcon weight='thin' className='w-10 h-10 text-amber-500 hover:text-amber-200/80' />
      }
     
      
    </button>
    
  )
}

export default ThemeToggle