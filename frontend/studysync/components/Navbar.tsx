'use client'
import Link from "next/link"
import dynamic from 'next/dynamic'
import Button from "./ui/Button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthProvider"


const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false })

const Navbar = () => {


  const pathname = usePathname();
  const { user } = useAuth();

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
        </div>

        

    </nav>
  )
}

export default Navbar