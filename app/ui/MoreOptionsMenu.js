import React, { useState, useContext, useEffect } from "react";
import Button from "./Button";
import XIcon from "./ui/XIcon";
import MoreOptionsButton from "./MoreOptionsButton";
import { UserContext } from "./app/UserContext";
import { BarContext } from "./app/BarContext";
import "../../styles/MoreOptionsMenu.css";


export default function MoreOptionsMenu ({
    path,
    nodeID,
    toggleBeingEditted,
    userID,
    reference,
    categoryObject,
    className,
    archived
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user] = useContext(UserContext);
    const { selectedBar } = useContext(BarContext);

    useEffect(() => { // close the menu when the bar changes
        setIsExpanded(false);
     }, [selectedBar.barID]);

   // determines if comments where created by a different user than the one logged in  
   const anothersComment = () => {
    // if it is a comment and there is a user logged in and
    // the user that created the comment is not the one logged in
        if ((path === '/comments/') && user && (userID !== user.userID)) {
            return true;
        } else {
            return false;
        }
    };
     
    // open and closes menu
    function toggleExpand () {
        setIsExpanded(isExpanded => !isExpanded);
    }
    
    return (
        <div className='moreOptionsMenuContainer'>
        <div
            className={`${className} moreSelectionsContainer`}
        > 
            {isExpanded &&
             <div
                className='moreOptionsButtonHolder expanded'
            > 
                {!user ? 
                    <>
                        {((path === '/comments/') || (path === '/ratings/')) && // no delete button on bars
                            <Button className='disabled' aria-disabled="true">Delete</Button>
                        }
                        {(categoryObject !== null) && // no archive button on comments
                            <Button className='disabled' aria-disabled="true">{archived ? 'Unarchive':'Archive'}</Button>
                        }
                        <Button className='disabled' aria-disabled="true">Edit</Button>
                    </>
                :
                <>
                {((path === '/comments/') || (path ==='/ratings/')) && // delete button only on comments and ratings
                    <MoreOptionsButton // Delete Button
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                        setIsExpanded={setIsExpanded}
                    /> }
                     {(categoryObject !== null) && // no archive button on comments
                    <MoreOptionsButton // Archive Button
                        archived={archived}
                        path={path}
                        nodeID={nodeID}
                        toggleExpand={toggleExpand}
                        reference={reference}
                        categoryObject={categoryObject} // only for Archive
                        setIsExpanded={setIsExpanded}
                    />}
                    <Button 
                        handleClick={toggleBeingEditted}
                        className='textButton'
                    >
                        Edit
                    </Button>
                </> // End !user
                }
            </div> // End isExpanded
            } 
             <Button
            //  ${className} is a prop, .expanded from state, .unarchived from database
             className={`menuButtonContainer ${className} ${isExpanded && 'expanded'} ${archived && 'unarchived'}`}
                // If there is a user logged in, but not the owner of the comment:
                // disable click handler and
                handleClick={anothersComment() ? null : toggleExpand}
                // update aria
                aria-disabled={anothersComment() && "true"}
            >
            {!isExpanded ?
                // add disabled class when there is a user, but not the owner 
                <div className={`${anothersComment() && 'disabled'} dotHolder`}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                :
                <XIcon
                    height='1.25em'
                    fillColor='rgba(255, 255, 255, 0.6)'
                />
            }
            </Button>
        </div> 
    </div>
    )
}