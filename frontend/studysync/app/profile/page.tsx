'use client'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import profileImage from '@/public/images/profile.jpg'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-offbackground rounded-lg shadow-lg p-8">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full overflow-hidden border-4 border-primary w-32 h-32">
              <Image
                src={profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {user.user.username}
              </h1>
              <p className="text-foreground/70">
                {user.user.email}
              </p>
            </div>

            {/* User Details */}
            <div className="border-t border-bordercolor pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded p-4">
                  <p className="text-sm text-foreground/70 font-medium mb-1">
                    User ID
                  </p>
                  <p className="text-foreground font-mono text-sm">
                    {user.user.id}
                  </p>
                </div>

                <div className="bg-background rounded p-4">
                  <p className="text-sm text-foreground/70 font-medium mb-1">
                    Timezone
                  </p>
                  <p className="text-foreground">
                    {user.user.timezone}
                  </p>
                </div>

                <div className="bg-background rounded p-4 col-span-2">
                  <p className="text-sm text-foreground/70 font-medium mb-1">
                    Member Since
                  </p>
                  <p className="text-foreground">
                    {new Date(user.user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Profile Section (Boilerplate) */}
            <div className="border-t border-bordercolor pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Account Settings
              </h2>
              <Button type='form-button'>Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
