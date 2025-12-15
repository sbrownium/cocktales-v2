import React, { useState } from "react";
import Delete from "./Delete";
import Button from "./Button";
import Modal from "./Modal";

export default function MoreEditButton ({
    path,
    nodeID,
    reference,
    toggleExpand,
    categoryObject,
    archived
}) {
    // removes slashes and 's' from path prop to use as singular text
    const type = path.replaceAll('/', '').slice(0,-1);

    // figures the thing being references for archive/unarchive (eg, the particular drink, bar, comment, or rating)
    const thisOne = () => {
        // categoryObject only exists for things that can be archived (drinks and bars)
        if (categoryObject && (type !== 'drink')){  
            // database uses a hash for key and the object for value
            // so only returning values then filtering for the particular thing's ID
            return Object.values(categoryObject).filter(a => a[type + 'ID'] === nodeID);
            // the drink array of objects has already had the keys removed in DrinkList
        } if (categoryObject && (type === 'drink')){
            return (categoryObject).filter(a => a[type + 'ID'] === nodeID);
        }
    }

    const action = () => { // for button & modal text
         // categoryObject only exists for things that can be archived (drinks and bars)
        if(categoryObject && archived) {
            return 'unarchive';
         } if(categoryObject && !archived) {
            return 'archive';
         } else {
            return 'delete';
         }
    };

    function handleModalToggle () {
        if (!reference.current.open) {
            reference.current.showModal(); // open modal
        } 
        else {
            reference.current.close(); // close modal
            toggleExpand(); // closes the menu 
        }
    } 
    return (
        <>
            <Button 
                handleClick={handleModalToggle}
                className='textButton'
            >
                {action()}
            </Button>
            <Modal
                reference={reference}
                path={path}
                nodeID={nodeID}
                handleModalToggle={handleModalToggle}
                toggleExpand={toggleExpand}
                thisOne={thisOne}
                type={type}
                action={action}
                archived={archived}
            />
        </>
    )
}