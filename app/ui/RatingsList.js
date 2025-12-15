import React, { useState, useContext, useRef } from "react";
import UserRating from "./UserRating";
import "./../styles/RatingsList";
import NewRating from "./NewRating";
import { UserContext } from "./app/UserContext";
import MoreOptionsMenu from "./MoreOptionsMenu";

export default function RatingsList ({
    barID,
    drinkID,
    emojiLookUp,
    ratings,
    users
}) {
    const [user] = useContext(UserContext);
    const [editRating, setEditRating] = useState(false);
    const ratingsArray = Object.values(ratings || {});
    const filteredRatings = ratingsArray.filter(rating => rating.drinkID === drinkID);
    const hasBeenRated = filteredRatings.find((rating) => rating.userID === user.userID);
    const ratingRef = useRef(null);

    function toggleRatingEdit () {
        setEditRating(editRating => !editRating);
      }

    return (
        <>
        <ul className="ratingsList">
            {filteredRatings.map(({userID, rating, ratingID}, index) => (
                <UserRating
                    barID={barID}
                    userID={userID}
                    drinkID={drinkID}
                    rating={rating}
                    ratingsArray={ratingsArray}
                    emojiLookUp={emojiLookUp}
                    users={users}
                    ratingID={ratingID}
                    index={index}
                    toggleRatingEdit={toggleRatingEdit}
                    hasBeenRated={hasBeenRated}
                    editRating={editRating}
                />
            ))}
        </ul>
        {(!hasBeenRated || editRating) ?
            <NewRating
                emojiLookUp={emojiLookUp}
                handleToggle={toggleRatingEdit}
                editRating={editRating}
                setEditRating={setEditRating}
                barID={barID}
                ratingsArray={ratingsArray}
                users={users}
                drinkID={drinkID}
                hasBeenRated={hasBeenRated}
            />
    :
            <>
        {!editRating &&
        <MoreOptionsMenu 
            path='/ratings/'
            nodeID={hasBeenRated && hasBeenRated.ratingID}
            toggleBeingEditted={toggleRatingEdit}
            userID={user.userID}
            reference={ratingRef}
            categoryObject={null} // for archiving
            className='ratings'
            // archived={archived}
        /> }
        </>
    }
    </>
    )
}