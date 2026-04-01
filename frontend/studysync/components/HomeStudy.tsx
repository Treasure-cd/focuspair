"use client"
import { useRouter } from 'next/router'
import StudyPickView from './StudyPickView'

const HomeStudy = () => {
    const router = useRouter();
  return (
     <div>
        <h2 className=' px-4 py-3 flex tracking-wide font-bold font-heading text-sm uppercase'>
          Start a study session
        </h2>
        <StudyPickView
          groups={[]} 
          onCreateGroup={() => router.push("/create")}
        />
     </div>
  )
}

export default HomeStudy