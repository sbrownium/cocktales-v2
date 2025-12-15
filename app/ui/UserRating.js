import React, { useContext, useState } from "react";
import { UserContext } from './app/UserContext.js';
import './UserRating.css'
// import Button from "./Button.js";
import NewRating from "./NewRating.js";
import MoreOptionsMenu from "./MoreOptionsMenu.js";

export default function UserRating ({
    barID,
    drinkID,
    userID,
    rating,
    emojiLookUp,
    index,
    users,
    ratingID,
    ratingsArray,
    toggleRatingEdit,
    hasBeenRated,
    editRating
}) {
    const [user] = useContext(UserContext);
    // const [editRating, setEditRating] = useState(false);
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].preferredName
    // const [ showName, setShowName ] = useState(false)
    const emojiKeys = Object.keys(emojiLookUp);
    const ratingToEmoji = emojiKeys.find(key => emojiLookUp[key] === rating);

    const userOwns = () => {
        if (hasBeenRated && user) {
            if (hasBeenRated.userID === userID)
                if (editRating)
                return true
        }  
    }
    
    return (
        <>
        { !userOwns() &&
        <li key={index}
            className={`emoji ${(user.userID === userID) && 'myRating color-1'}`}
        >
            <p className='emojiRating'>{ratingToEmoji}</p>
            <p className='ratingName'>{preferredName}</p>
        </li>
    }
    </>
    ) 
}