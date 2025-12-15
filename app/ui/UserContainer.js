import React, {useContext} from "react";
import Comment from "./Comment";
import UserRating from "./UserRating";
import { UserContext } from "./app/UserContext";
import "./../styles/UserContainer";

export default function UserContainer ({
    archived,
    barID,
    filteredComments,
    filteredRatings,
    drinkID,
    users,
    userID,
    commentID,
    initialTimeStamp,
    text,
    handleToggle,
    beingEditted,
    ratingsArray,
    emojiLookUp,
    index,
    isExpanded 
}) {
    const [user] = useContext(UserContext);  
    const usersArray = Object.values(users);
    const filteredUsers = usersArray.filter(u => u.userID === userID);
    const preferredName = filteredUsers[0].preferredName
    
    return (
        <>
        {isExpanded ? 
        <div className='userContainer'>
            <div className='feedbackContainer'>
        {(filteredRatings.filter(rating => rating.userID === userID).length !== 0) &&    
        <UserRating
            userID={userID}
            drinkID={drinkID}
            ratingsArray={ratingsArray}
            emojiLookUp={emojiLookUp}
          />
        }
        
       
        {(filteredComments.filter(comment => comment.userID === userID).length !== 0)  && 
        //  <div className="commentContainer"> 
        // currently only can only show one comment per user  
        <Comment
            filteredComments={filteredComments}
            drinkID={drinkID}
            key={index}
            users={users}
            userID={userID}
            commentID={commentID}
            initialTimeStamp={initialTimeStamp}
            text={text}
            handleToggle={handleToggle}
            beingEditted={beingEditted}
        />
        // </div> 
    }
        {/* {(!beingEditted && !archived && (user.userID === userID)) && 
              <NewComment
                drinkID={drinkID}
                barID={barID}
            />
            } */}
            </div>
            {preferredName}
            </div>
        :
            <UserRating
            userID={userID}
            drinkID={drinkID}
            ratingsArray={ratingsArray}
            emojiLookUp={emojiLookUp}
        />
            }
            
        </> 
        
    )
    
}