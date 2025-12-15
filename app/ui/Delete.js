import { ref, update } from "firebase/database";
import { db } from "./firebase.js";
import Button from "./Button";

export default function Delete ({
    path,
    nodeID,
    className,
    handleModalToggle,
    toggleExpand
}) {
    
     function handleDelete(e){
        const updates = {};
        e.preventDefault(); 
        handleModalToggle();
        toggleExpand();
        updates[path + nodeID] = null;
        return (
            update(ref(db), updates).then(() => {
                console.log('Data saved successfully!')
          })
      .catch((error) => {
        console.log('problem deleting')
      })
       )    
    }
    return (
        <>
            <Button className={className} handleClick={handleDelete}>
            Delete
            </Button>
        </>
    )
}