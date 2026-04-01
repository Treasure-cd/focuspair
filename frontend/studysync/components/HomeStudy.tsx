"use client"
import { useState } from 'react';
import StudyPickView from './StudyPickView'
import CreateGroupModal from './CreateGroupModal';

const HomeStudy = () => {
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);

    function handleSubmit() {

    }
  return (
     <div>
        <h2 className=' px-4 py-3 flex tracking-wide font-bold font-heading text-sm uppercase'>
          Start a study session
        </h2>
        <StudyPickView
          groups={[]} 
          onCreateGroup={() => setIsCreateGroupModalOpen(true)}
        />
        <CreateGroupModal 
            isOpen={isCreateGroupModalOpen}
            onClose={() => setIsCreateGroupModalOpen(false)}
            onSubmit={handleSubmit}
        />
     </div>
  )
}

export default HomeStudy