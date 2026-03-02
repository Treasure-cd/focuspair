'use client'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/user'
import { User } from '@/app/types/userType'
import { SignOutIcon, UserIcon } from '@phosphor-icons/react'

interface ProfileMenuProps {
  user: User
  onClose: () => void
}

const ProfileMenu = ({ user, onClose }: ProfileMenuProps) => {
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
    <div className="absolute top-full right-0 mt-2 w-48 bg-offbackground rounded-lg shadow-lg border border-bordercolor z-50">
      <div className="px-4 py-3 border-b border-bordercolor">
        <p className="text-sm font-medium text-foreground truncate">
          {user.user.username}
        </p>
      </div>
      
      <button
        onClick={handleProfileClick}
        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-foreground hover:bg-hover flex items-center gap-2 transition-colors"
      >
        <UserIcon size={16} />
        Profile
      </button>
      
      <button
        onClick={handleLogout}
        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 hover:bg-hover flex items-center gap-2 transition-colors border-t border-bordercolor"
      >
        <SignOutIcon size={16} />
        Log Out
      </button>
    </div>
  )
}

export default ProfileMenu
