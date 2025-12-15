import React, { useState, useContext, useEffect } from "react";
import { BarContext } from "./app/BarContext";
import Comment from "./Comment";
import NewComment from "./NewComment";
import Button from "./Button";
import "../styles/CommentList";

export default function CommentList ({
        comments,
        drinkID,
        handleToggle,
        beingEditted,
        users
    }) {
    const commentsArray = Object.values(comments || {});
    const filteredComments = commentsArray.filter(comments => comments.drinkID === drinkID);
    const [ isExpanded, setIsExpanded ] = useState(false);
    const { selectedBar } = useContext(BarContext);

    useEffect(() => {
        setIsExpanded(false);
     }, [selectedBar.barID]);


    function toggleExpanded () {
        setIsExpanded(isExpanded => !isExpanded);
    }

    return (
        <div className={`commentListContainer ${isExpanded && 'expanded'}`}>
            {isExpanded ?
                <>
                <Button className='buttonEmoji color-2' handleClick={toggleExpanded}>
                comments 🙈
                </Button>
                <ul>
                    {filteredComments.map(({commentID, initialTimeStamp, text, userID}, index) => (
                        <Comment
                            commentID={commentID}
                            drinkID={drinkID}
                            initialTimeStamp={initialTimeStamp}
                            text={text}
                            userID={userID}
                            index={index}
                            handleToggle={handleToggle}
                            beingEditted={beingEditted}
                            users={users}
                        />
                    ))}
            </ul>
            <NewComment
                drinkID={drinkID}
                users={users}
                setIsExpanded={setIsExpanded}
            />
            </> :
            <Button className='buttonEmoji color-2' handleClick={toggleExpanded}>
                comments 🐵
            </Button>
            }
            
    </div>
    )
}