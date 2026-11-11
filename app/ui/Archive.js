import React from 'react';
// import { ref, update } from 'firebase/database';
// import { db } from '../firebase';
import Button from './Button';

export default function Archive ({
    path,
    nodeID,
    className,
    handleModalToggle,
    toggleExpand,
    thisOne,
    archived
}) {
    function handleArchive(e){
        const updates = {};
        e.preventDefault();

        const newArchive = {
            ...thisOne()[0],
            archived: (thisOne()[0].archived === true) ? false : true,
            lastTimeStamp: Date.now()
          };
          updates[path + nodeID] = newArchive;
          handleModalToggle();
        toggleExpand();
return (
  update(ref(db), updates).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
         console.error("Error updating data:", error);
})
)}
return (
    <>
        <Button className={className} handleClick={handleArchive}>
        {archived ? `Unarchive` : `Archive` }
        </Button>
    </>
)
}