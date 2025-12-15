import React, { useState, useContext, useRef, useEffect } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './app/UserContext.js';
import { BarContext } from './app/BarContext.js';
import Submit from './Submit.js';
import Button from './Button.js';
import SignInModal from './SignInModal.js';
import XIcon from './XIcon.js';
import '../styles/NewComment';

export default function NewComment({
  drinkID,
  users,
  setIsExpanded
}) {
    const [comment, setComment] = useState('');
    const [commentAlert, setCommentAlert] = useState(false);
    const [user] = useContext(UserContext);
    const { userName, userID } = user;
    const { selectedBar } = useContext(BarContext);
    const [ showAdd, setShowAdd ] = useState(false);
    const newCommentRef = useRef(null);

    // If user tries to leave comment before signing in,
    // controls closing SignInModal after signing in
    useEffect(() => {
        if(user && (comment.length > 1)) { // needs to use comment.length to make sure someone is trying to leave comment
          // or else it will try to run handleCommentSubmit whenever someone logs in anytime in app
          newCommentRef.current?.close(); // closes modal
          handleCommentSubmit(); // submits comment            
        }
      }, [user]);

    // removes alert onces user adds comment
      useEffect(() => {
        if ((comment.length > 1))
        setCommentAlert(false)
      }, [comment]);

  function handleToggle () {
    setShowAdd(showAdd => !showAdd);
  }

  function handleCommentSubmit () {
    if (comment.length < 1) {// If there isn't a comment, 
      return setCommentAlert(true); //show an alert and stop submission
    }
    const newCommentKey = push(child(ref(db), '/comments/')).key;
      const updates = {};
      const newComment = {
        commentID: newCommentKey,
        userID: userID,
        drinkID: drinkID,
        barID: selectedBar.barID,
        initialTimeStamp: Date.now(),
        lastTimeStamp: Date.now(),
        text: comment,
      };
    setComment(''); // reset comment state
    updates['/comments/' + newCommentKey] = newComment; // syntax for database
    setIsExpanded(true); // opens comment toggle from FeedbackList so user sees new comment immediately
   
    return (
        update(ref(db), updates).then(() => {
            console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('problem writing')
      })
    ) 
  }
 function clearComment () {
  setComment(''); // reset comment state
 }

  function handleSignInModal () {
    if (!newCommentRef.current.open) {
      newCommentRef.current.showModal(); // open modal
     }  else {
      newCommentRef.current.close();
     }
  }

async function handleClick(e) {
e.preventDefault();
  if (!user) {
    handleSignInModal();
    return; // stop further execution until the user signs in
  }
  try {
    // Handle comment submission asynchronously
    await handleCommentSubmit();
    console.log('Comment submitted successfully');
  } catch (error) {
    console.log('Error submitting the comment:', error);
  }
}
    return (
      <>
      <div className="commentForm">
        <form>
          <input
            type="text"
            value={comment}
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <Submit className="color-2" handleClick={handleClick} value='Add'/>
        </form>
        {/* <Button className="color-4" handleClick={clearComment}>Clear</Button> */}
        </div>
        {commentAlert &&
            <div className='commentAlert'>
            <Button className='icon' handleClick={() => setCommentAlert(false)} >
              <XIcon 
                width='15px'
                height='15px'
                fillColor='rgba(255, 255, 255, 0.6)'
              />
             </Button> 
            <p>Please add your comment before submitting</p>
            </div>
          }
          <SignInModal
            message='leave a comment'
            reference={newCommentRef}
            handleToggle={handleSignInModal}
            users={users}
            handleCommentSubmit={handleCommentSubmit}
          />
      </>
    );
  }
