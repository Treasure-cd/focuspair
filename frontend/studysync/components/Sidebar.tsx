'use client'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/user'
import { User } from '@/app/types/userType'
import { SignOutIcon, UserIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import image from '../public/images/profile.jpg'

interface SidebarProps {
  user: User
  onClose: () => void
}

const Sidebar = ({ user, onClose }: SidebarProps) => {
  const router = useRouter()

  const handleProfileClick = () => {
    onClose()
    router.push('/profile')
  }

  const handleLogout = async () => {
    onClose()
    await logout()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-3/4 bg-offbackground border-l border-bordercolor z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-bordercolor">
          <span className="font-logo text-xl font-extrabold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-hover transition-colors focus:outline-none"
          >
            <XIcon size={22} />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-bordercolor">
          <div className="rounded-full overflow-hidden border-2 border-primary/50 w-12 h-12 shrink-0">
            <Image
              src={image}
              alt="profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-medium text-foreground truncate">
            {user.user.username}
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col flex-1 px-4 py-4 gap-1">
          <button
            onClick={handleProfileClick}
            className="w-full cursor-pointer px-4 py-3 text-left text-sm text-foreground hover:bg-hover flex items-center gap-3 rounded-lg transition-colors"
          >
            <UserIcon size={18} />
            Profile
          </button>
        </nav>

        {/* Logout pinned to bottom */}
        <div className="px-4 pb-6 border-t border-bordercolor pt-4">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer px-4 py-3 text-left text-sm text-red-500 hover:bg-hover flex items-center gap-3 rounded-lg transition-colors"
          >
            <SignOutIcon size={18} />
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar