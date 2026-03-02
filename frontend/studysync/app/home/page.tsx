import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import User from '@/components/User';

const page = async() => {




  return (
    <div>
        <h1>Homepage</h1>
        <p>Hello </p>
        <User />
    </div>
  )
}

export default page