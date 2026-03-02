'use client'
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import Button from "./ui/Button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthProvider"
import ProfileMenu from "./ProfileMenu"
import image from "../public/images/profile.jpg"


const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false })

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  if (pathname === "/signin" || pathname === "/dev") return null;
  return (
    <nav className='py-3 bg-black/10 backdrop-blur-lg flex flex-row justify-between sticky top-0'>
      <div className="flex flex-row items-center">
        <a href="localhost:3000/home">
        <h2 className='font-logo
         text-2xl font-extrabold pl-5 cursor-pointer'>
            StudySync
        </h2>
        </a>
        </div>

        <div className="flex flex-row items-center px-10 gap-3">
        {!user && 
        <>
          <p className="font-light">Already have an account?</p>
        <Link href={"/signin"}>
          <Button 
            type="primary"
            onClick={() => {}}
        >Login</Button>
          </Link>
          </>
        }
        
        <ThemeToggle />

        {user && 
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-full overflow-hidden cursor-pointer border-2 border-primary/50 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image 
              src={image} 
              alt="profile" 
              width={40} 
              height={40} 
              className="w-10 h-10 object-cover"
            />
          </button>
          {showMenu && user && (
            <ProfileMenu user={user} onClose={() => setShowMenu(false)} />
          )}
        </div>
        }

        </div>

        

    </nav>
  )
}

export default Navbar