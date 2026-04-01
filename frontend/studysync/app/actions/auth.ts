'use server'
import { cookies } from 'next/headers'
import ky, { HTTPError } from 'ky';
import { getApiBaseUrl } from "@/utils/getBaseUrl";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function login(identifier: string, password: string) {
  try {
    const apiUrl = getApiBaseUrl();
    const data = await ky.post(`${apiUrl}/auth/login`, {json: { identifier, password }}).json<{token: string}>();
    const cookieStore = await cookies();
    cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
    revalidatePath('/home', 'layout')
    return { success: true }
    
  } catch (err) {
      if (err instanceof HTTPError) {
        const errorData = await err.response.json();
        throw new Error(errorData.message || "Login failed");
      }

      throw new Error("Something went wrong");
    }
}

export async function signup(email: string, username: string, password: string, tz: string) {
  try {
    const apiUrl = getApiBaseUrl();
    const data = await ky.post(`${apiUrl}/auth/signup`, {json: { email, password, username, timezone: tz }}).json();

    return data;
  } catch (err) {
      if (err instanceof HTTPError) {
      const errorData = await err.response.json();
      throw new Error(errorData.message || "Signup failed")
   }
   throw new Error("Something went wrong");
  }
}

