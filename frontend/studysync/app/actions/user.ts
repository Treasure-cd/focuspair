'use server'

import { cookies } from 'next/headers'
import ky, { HTTPError } from 'ky'
import { getApiBaseUrl } from '@/utils/getBaseUrl'
import { User } from '../types/userType'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getMe() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    console.log("No token yet??")
    return null
  }

    const apiUrl = getApiBaseUrl()

    const res: User = await ky.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set('Cache-Control', 'no-store');
        }
      ]
    }
    }).json()
  
    console.log("Positive there's a token")
    return res
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  revalidatePath('/')
  redirect('/signin')
}